import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** WCAG 2.x level A and AA rules, including the 2.2 additions (target size). */
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function openApp(page: Page) {
  await page.goto("/");
  await expect(page.locator("#domain_guide_1")).toBeVisible();
}

/** Serious and critical axe violations, formatted for a readable failure. */
async function seriousViolations(page: Page): Promise<string[]> {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(" ")}`);
}

test.describe("layout", () => {
  test("the study panel is usable and the page never scrolls sideways", async ({ page }) => {
    await openApp(page);
    const panel = await page.locator("#study_panel_wrapper").boundingBox();
    // Regression guard: on phones this panel once collapsed to 0 px.
    expect(panel?.height ?? 0).toBeGreaterThan(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("the domain guide opens and keeps its tables inside their box", async ({ page }) => {
    await openApp(page);
    await page.locator("#domain_guide_1 > summary").click();
    await expect(page.locator("#domain_guide_1 table").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  test("study view with the domain guide open", async ({ page }) => {
    await openApp(page);
    await page.locator("#domain_guide_1").evaluate((el) => ((el as HTMLDetailsElement).open = true));
    expect(await seriousViolations(page)).toEqual([]);
  });

  test("glossary view", async ({ page }) => {
    await openApp(page);
    await page.locator("#tab_btn_glossary").click();
    await expect(page.locator("#glossary_root")).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test("exam simulator setup", async ({ page }) => {
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    await expect(page.locator("#start_quiz_btn")).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });
});

test.describe("keyboard", () => {
  test("a question can be answered and the verdict is announced without a mouse", async ({ page }) => {
    await openApp(page);
    await page.locator("#tab_btn_quiz").focus();
    await page.keyboard.press("Enter");
    await page.locator("#start_quiz_btn").focus();
    await page.keyboard.press("Enter");

    await expect(page.locator("#quiz_options_list")).toBeVisible();
    const options = page.locator("#quiz_options_list [role=radio], #quiz_options_list [role=checkbox]");
    await expect(options.first()).toBeVisible();

    // Digits select options; a "choose TWO" question needs a second one.
    await page.keyboard.press("1");
    if (await page.locator("#quiz_confirm_btn").isDisabled()) await page.keyboard.press("2");
    await expect(options.first()).toHaveAttribute("aria-checked", "true");

    await page.keyboard.press("Enter");
    await expect(page.locator("#quiz_feedback_box")).toBeVisible();
    await expect(page.locator("#quiz_feedback_announcer")).not.toBeEmpty();
    await expect(page.locator("#quiz_feedback_announcer")).toHaveAttribute("role", "status");

    await page.keyboard.press("Enter");
    await expect(page.locator("#quiz_feedback_box")).toBeHidden();
    await expect(page.locator("#quiz_feedback_announcer")).toBeEmpty();
  });
});

test.describe("your data (export, import, delete)", () => {
  async function openSimulator(page: Page) {
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    await expect(page.locator("#data_controls")).toBeVisible();
  }

  test("export downloads a backup of this browser's progress", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("comptia_sy0701_checklist", JSON.stringify({ WPA3EnterpriseRes: true })));
    await openSimulator(page);
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#data_export_btn").click()]);
    expect(download.suggestedFilename()).toMatch(/^security-plus-progress-\d{4}-\d{2}-\d{2}\.json$/);
    const backup = JSON.parse(await (await download.createReadStream()).toArray().then((c) => Buffer.concat(c).toString()));
    expect(backup.app).toBe("comptia-security-sy0-701");
    expect(backup.data.checklist).toEqual({ WPA3EnterpriseRes: true });
  });

  test("a file from elsewhere is rejected with an explanation", async ({ page }) => {
    await openSimulator(page);
    await page.locator("#data_import_input").setInputFiles({
      name: "other.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ app: "another-app", schema: 1, data: {} })),
    });
    await expect(page.locator("#data_status")).toHaveText(/non è un backup di questa app/);
    await expect(page.locator("#data_confirm_box")).toBeHidden();
  });

  test("import asks for confirmation, then replaces the progress", async ({ page }) => {
    await openSimulator(page);
    const backup = {
      app: "comptia-security-sy0-701",
      schema: 1,
      exportedAt: "2026-09-20T10:00:00.000Z",
      data: { checklist: { HoneynetDeception: true }, bookmarks: [], quizHistory: [], questionProgress: {} },
    };
    await page.locator("#data_import_input").setInputFiles({
      name: "backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(backup)),
    });
    await expect(page.locator("#data_confirm_box")).toContainText("1 argomenti completati");
    await Promise.all([page.waitForEvent("load"), page.locator("#data_confirm_btn").click()]);
    const stored = await page.evaluate(() => localStorage.getItem("comptia_sy0701_checklist"));
    expect(JSON.parse(stored ?? "{}")).toEqual({ HoneynetDeception: true });
  });

  test("delete all needs a second confirmation and empties this browser's storage", async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem("seeded")) {
        localStorage.setItem("comptia_sy0701_checklist", JSON.stringify({ WPA3EnterpriseRes: true }));
        sessionStorage.setItem("seeded", "1");
      }
    });
    await openSimulator(page);
    await page.locator("#data_delete_btn").click();
    await expect(page.locator("#data_confirm_box")).toBeVisible();
    await page.locator("#data_cancel_btn").click();
    expect(await page.evaluate(() => localStorage.getItem("comptia_sy0701_checklist"))).not.toBeNull();

    await page.locator("#data_delete_btn").click();
    await Promise.all([page.waitForEvent("load"), page.locator("#data_confirm_btn").click()]);
    expect(await page.evaluate(() => localStorage.getItem("comptia_sy0701_checklist"))).toBeNull();
  });
});
