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

test.describe("layout: main menu", () => {
  test("every section of the menu is visible at once, without scrolling it sideways", async ({ page }) => {
    await openApp(page);
    const nav = page.locator("#navigation_tabs");
    expect(await nav.evaluate((el) => el.scrollWidth - el.clientWidth)).toBe(0);
    for (const id of ["#tab_btn_studio", "#tab_btn_glossary", "#tab_btn_quiz", "#toggle_sidebar_btn", "#lang_btn_en"]) {
      await expect(page.locator(id)).toBeInViewport({ ratio: 1 });
    }
    // Each tab keeps a readable name, short on phones and full on desktop.
    await expect(page.getByRole("tab", { name: /Glossario/ })).toBeVisible();
  });

  test("the icons for browsers and phones are served", async ({ page, request }) => {
    await openApp(page);
    for (const href of ["/favicon.ico", "/favicon.svg", "/apple-touch-icon.png", "/manifest.webmanifest"]) {
      expect(await page.locator(`link[href="${href}"]`).count(), href).toBe(1);
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
      expect(res.headers()["content-type"], href).not.toContain("text/html");
    }
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    for (const icon of manifest.icons) expect((await request.get(icon.src)).status(), icon.src).toBe(200);
  });
});

test.describe("layout: simulator", () => {
  test("the top of the quiz panel can always be reached by scrolling", async ({ page }) => {
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    await expect(page.locator("#start_quiz_btn")).toBeAttached();
    // Regression guard: a centred flex scroller once cut off the top of the
    // set-up on phones, above the scroll origin where no scrolling reaches.
    const [container, panel] = await Promise.all([
      page.locator("#quiz_layout").boundingBox(),
      page.locator("#quiz_panel_container").boundingBox(),
    ]);
    expect(panel!.y).toBeGreaterThanOrEqual(container!.y);
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  test("study view with the domain guide open", async ({ page }) => {
    await openApp(page);
    await page.locator("#domain_guide_1").evaluate((el) => ((el as HTMLDetailsElement).open = true));
    expect(await seriousViolations(page)).toEqual([]);
  });

  test("glossary view", async ({ page }) => {
    // axe walks all 550 glossary entries: ~25 s with parallel workers, close to
    // the 30 s default. slow() triples the budget instead of hiding the check.
    test.slow();
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
    // Colour is never the only cue: the right option says so in words (WCAG 1.4.1).
    await expect(page.locator("#quiz_options_list")).toContainText("Risposta corretta");
    await expect(page.locator("#quiz_options_list")).toContainText("La tua risposta");

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

test.describe("AI transparency", () => {
  test("the AI Trainer always shows its limits and a privacy warning", async ({ page }) => {
    await openApp(page);
    // The panel starts open on wide screens and closed on phones.
    if (!(await page.locator("#ai_sidebar").isVisible())) await page.locator("#toggle_sidebar_btn").click();
    await expect(page.locator("#ai_disclaimer")).toContainText("possono contenere errori");
    await expect(page.locator("#ai_disclaimer")).toContainText("dati personali");
  });
});

test.describe("Content-Security-Policy", () => {
  test("no view breaks the policy or contacts another origin, and the bundled fonts load", async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const foreign: string[] = [];
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (/^https?:$/.test(url.protocol) && url.origin !== origin) foreign.push(request.url());
    });
    await page.addInitScript(() => {
      const seen: string[] = [];
      (window as unknown as { __csp: string[] }).__csp = seen;
      document.addEventListener("securitypolicyviolation", (e) => seen.push(`${e.violatedDirective} ${e.blockedURI}`));
    });

    await openApp(page);
    await page.locator("#domain_guide_1 > summary").click();
    await page.locator("#tab_btn_glossary").click();
    await expect(page.locator("#glossary_root")).toBeVisible();
    await page.locator("#tab_btn_quiz").click();
    await page.locator("#start_quiz_btn").click();
    await expect(page.locator("#quiz_options_list")).toBeVisible();
    await page.keyboard.press("1");
    if (await page.locator("#quiz_confirm_btn").isDisabled()) await page.keyboard.press("2");
    await page.keyboard.press("Enter");
    await expect(page.locator("#quiz_feedback_box")).toBeVisible();

    expect(await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp)).toEqual([]);
    expect(foreign).toEqual([]);
    expect(await page.evaluate(() => document.fonts.check('16px "Inter Variable"'))).toBe(true);
    const csp = (await page.request.get("/")).headers()["content-security-policy"];
    expect(csp).not.toContain("unsafe-inline");
  });
});

test.describe("quiz by objective", () => {
  test("drills every question of one official objective, chosen with the keyboard", async ({ page }) => {
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    const select = page.locator("#objective_select");
    await expect(page.locator("#objective_start_btn")).toBeDisabled();
    expect(await select.locator("option[value]:not([value=''])").count()).toBe(28);
    expect(await seriousViolations(page)).toEqual([]);

    await select.selectOption("1.1");
    const label = await select.locator("option[value='1.1']").textContent();
    const expected = Number(label?.match(/\((\d+) /)?.[1]);
    expect(expected).toBeGreaterThanOrEqual(10);

    await page.locator("#objective_start_btn").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#quiz_options_list")).toBeVisible();
    await expect(page.getByText(`1 DI ${expected}`, { exact: false })).toBeVisible();
  });

  test("at the end, points back to the guide section on that objective", async ({ page }) => {
    test.slow();
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    await page.locator("#objective_select").selectOption("1.1");
    await page.locator("#objective_start_btn").click();

    // Answer every question by keyboard until the results screen appears.
    for (let i = 0; i < 60 && !(await page.locator("#quiz_completed_screen").isVisible()); i++) {
      await expect(page.locator("#quiz_options_list")).toBeVisible();
      await page.keyboard.press("1");
      if (await page.locator("#quiz_confirm_btn").isDisabled()) await page.keyboard.press("2");
      await page.keyboard.press("Enter");
      await expect(page.locator("#quiz_feedback_box")).toBeVisible();
      await page.keyboard.press("Enter");
    }
    await expect(page.locator("#objective_followup_box")).toContainText("1.1");

    await page.locator("#objective_followup_btn").click();
    await expect(page.locator("#domain_guide_1")).toHaveAttribute("open", "");
    await expect(page.locator("#guide_objective_1_1")).toBeFocused();
    await expect(page.locator("#guide_objective_1_1")).toBeInViewport();
  });
});

test.describe("study paths (Where do I start?)", () => {
  test("open for a new learner, folded once there is progress", async ({ page }) => {
    await openApp(page);
    await expect(page.locator("#study_paths")).toHaveAttribute("open", "");
    await expect(page.locator("#study_path_beginner")).toHaveAttribute("aria-pressed", "true");

    await page.evaluate(() => localStorage.setItem("comptia_sy0701_checklist", JSON.stringify({ WPA3EnterpriseRes: true })));
    await page.reload();
    await expect(page.locator("#domain_guide_1")).toBeVisible();
    await expect(page.locator("#study_paths")).not.toHaveAttribute("open", "");
  });

  test("the exam path prepares a 90-question simulation with the timer on", async ({ page }) => {
    await openApp(page);
    await page.locator("#study_path_exam").click();
    await page.locator("#study_path_steps").getByRole("button").first().click();
    await expect(page.locator("#start_quiz_btn")).toBeFocused();
    await expect(page.locator("#custom_quiz_summary_box")).toContainText("90");
    await expect(page.locator("#timer_toggle_input")).toBeChecked();
    await expect(page.locator("#custom_quiz_summary_box")).toContainText("~90 min");
  });

  test("a guide step opens that domain's guide and moves focus to it", async ({ page }) => {
    await openApp(page);
    await page.locator("#study_path_steps").getByRole("button", { name: /Dominio 2/ }).click();
    await expect(page.locator("#domain_guide_2")).toHaveAttribute("open", "");
    await expect(page.locator("#domain_guide_2_summary")).toBeFocused();
  });
});

test.describe("AI access code", () => {
  test("asks for the code when the server requires it, then sends it with the next question", async ({ page }) => {
    const sentCodes: (string | undefined)[] = [];
    await page.route("**/api/chat", async (route) => {
      const code = route.request().headers()["x-access-token"];
      sentCodes.push(code);
      if (code !== "correct-horse-battery-staple") {
        await route.fulfill({ status: 401, json: { code: "access_token_required", error: "code needed" } });
      } else {
        await route.fulfill({ status: 200, json: { reply: "Risposta sbloccata" } });
      }
    });

    await openApp(page);
    if (!(await page.locator("#ai_sidebar").isVisible())) await page.locator("#toggle_sidebar_btn").click();
    await expect(page.locator("#ai_access_form")).toHaveCount(0);

    await page.locator("#chat_text_input").fill("Che cos'è l'ALE?");
    await page.locator("#chat_submit_btn").click();
    await expect(page.locator("#ai_access_form")).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);

    await page.locator("#ai_access_input").fill("correct-horse-battery-staple");
    await page.locator("#ai_access_submit").click();
    await expect(page.locator("#ai_access_form")).toHaveCount(0);

    await page.locator("#chat_text_input").fill("Che cos'è l'ALE?");
    await page.locator("#chat_submit_btn").click();
    await expect(page.locator("#ai_sidebar")).toContainText("Risposta sbloccata");
    expect(sentCodes).toEqual([undefined, "correct-horse-battery-staple"]);
  });
});

test.describe("glossary terms in context", () => {
  test("after an answer, a glossary acronym shows its definition in place", async ({ page }) => {
    test.slow();
    await openApp(page);
    await page.locator("#tab_btn_quiz").click();
    await page.locator("#objective_select").selectOption("4.4"); // alerting and monitoring: SIEM, SOAR, ...
    await page.locator("#objective_start_btn").click();

    const hints = page.locator("#quiz_glossary_hints");
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("1");
      if (await page.locator("#quiz_confirm_btn").isDisabled()) await page.keyboard.press("2");
      await page.keyboard.press("Enter");
      await expect(page.locator("#quiz_feedback_box")).toBeVisible();
      if (await hints.isVisible()) break;
      await page.keyboard.press("Enter");
    }
    await expect(hints).toBeVisible();

    const chip = hints.getByRole("button").first();
    await expect(chip).toHaveAttribute("aria-expanded", "false");
    await chip.click();
    await expect(chip).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#quiz_glossary_definition")).not.toBeEmpty();
    expect(await seriousViolations(page)).toEqual([]);
  });
});

test.describe("AI output is untrusted", () => {
  test("HTML, scripts and javascript: links in an answer are shown as text, never run", async ({ page }) => {
    const hostile =
      'Here is **bold**. <img src="x" onerror="window.__pwned = true"> ' +
      '<script>window.__pwned = true</script> [click me](javascript:window.__pwned=true)';
    await page.route("**/api/chat", (route) => route.fulfill({ status: 200, json: { reply: hostile } }));

    await openApp(page);
    if (!(await page.locator("#ai_sidebar").isVisible())) await page.locator("#toggle_sidebar_btn").click();
    await page.locator("#chat_text_input").fill("Explain XSS");
    await page.locator("#chat_submit_btn").click();

    const log = page.locator("#chat_messages_area");
    await expect(log).toContainText("<img");
    await expect(log.locator("img, script, a[href^='javascript' i], [onerror]")).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __pwned?: boolean }).__pwned)).toBeUndefined();
  });

  test("an answer of the wrong shape is refused with a message, not shown", async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ status: 200, json: { reply: { html: "<b>x</b>" } } }));

    await openApp(page);
    if (!(await page.locator("#ai_sidebar").isVisible())) await page.locator("#toggle_sidebar_btn").click();
    await page.locator("#chat_text_input").fill("Explain XSS");
    await page.locator("#chat_submit_btn").click();

    await expect(page.locator("#chat_messages_area")).toContainText("risposta del server non valida");
    await expect(page.locator("#chat_messages_area")).not.toContainText("[object Object]");
  });
});

test.describe("domain routes (before you start, where to go next)", () => {
  test("a next step jumps to the linked objective in another domain's guide", async ({ page }) => {
    await openApp(page);
    await page.locator("#domain_guide_1_summary").click();
    await expect(page.locator("#guide_before_1")).toContainText("TCP/IP");
    await page.locator("#guide_next_1").getByRole("button", { name: "Vai all'obiettivo 3.3" }).click();
    await expect(page.locator("#domain_guide_3")).toHaveAttribute("open", "");
    await expect(page.locator("#guide_objective_3_3")).toBeFocused();
    await expect(page.locator("#guide_objective_3_3")).toBeInViewport();

    // And back: a prerequisite of Domain 3 points to cryptography in Domain 1.
    await page.locator("#guide_before_3").getByRole("button", { name: "Vai all'obiettivo 1.4" }).click();
    await expect(page.locator("#guide_objective_1_4")).toBeFocused();
  });
});
