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
