import { PBQ_SCENARIOS } from "../src/pbqData";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const domainPbqCount = PBQ_SCENARIOS.filter(p => p.domain === 4).length;

const solution = [
  ["p_message_a", "fail_spf_unaligned"],
  ["p_message_b", "pass_dkim"],
  ["p_message_c", "fail_dkim_unaligned"],
  ["p_message_d", "pass_relaxed_spf"],
  ["p_message_e", "fail_strict"],
  ["p_message_f", "pass_strict_spf"],
  ["p_disposition", "reject_request"],
  ["p_limits", "pass_not_safety"]
];
async function open(page: Page) {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}
async function keyboardMatch(page: Page, id: string, value: string) {
  const select = page.locator(`#pbq_match_${id}`);
  const index = await select.locator("option").evaluateAll((options, target) => options.findIndex(o => (o as HTMLOptionElement).value === target), value);
  expect(index).toBeGreaterThan(0);
  await select.focus();
  await select.press("Home");
  for (let n = 0; n < index; n++) await select.press("ArrowDown");
  await select.press("Tab");
  await expect(select).toHaveValue(value);
}
async function accessible(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(violations.filter(v => v.impact === "serious" || v.impact === "critical").map(v => v.id)).toEqual([]);
}
for (const lang of ["it", "en"] as const) {
  test(`${lang}: DMARC task can be answered and reset using the keyboard`, async ({ page }) => {
    await open(page);
    await page.locator(`#lang_btn_${lang}`).click();
    await page.locator("#tab_btn_pbq").click();
    await page.locator("#pbq_start_403").focus();
    await page.locator("#pbq_start_403").press("Enter");
    await accessible(page);
    for (const [id, value] of solution) await keyboardMatch(page, id, value);
    await page.locator("#pbq_submit").focus();
    await page.locator("#pbq_submit").press("Enter");
    await expect(page.locator("#pbq_feedback")).toContainText(lang === "it" ? "Tutto corretto" : "All correct");
    await accessible(page);
    await page.locator("#pbq_next").click();
    await page.locator("#pbq_restart").click();
    for (const [id] of solution) await expect(page.locator(`#pbq_match_${id}`)).toHaveValue("");
    await expect(page.locator("#pbq_submit")).toBeDisabled();
    for (const [id, value] of solution) await keyboardMatch(page, id, id === "p_message_a" ? "spf_always_pass" : value);
    await page.locator("#pbq_submit").click();
    await expect(page.locator("#pbq_match_row_p_message_a")).toContainText(lang === "it" ? "Corretto: DMARC=fail" : "Correct: DMARC=fail");
  });
}

test("DMARC answer survives exam navigation and language changes; result persists after reload", async ({ page }) => {
  await open(page);
  await page.locator("#tab_btn_quiz").click();
  for (let d = 1; d <= 5; d++) {
    const slider = page.locator('input[type="range"]').nth(d - 1);
    await slider.focus(); await slider.press("Home");
    if (d === 4) for (let n = 0; n < domainPbqCount; n++) await slider.press("ArrowRight");
  }
  await page.locator("#exam_pbq_count").selectOption(String(domainPbqCount));
  await page.locator("#start_exam_btn").click();
  for (let n = 0; n < domainPbqCount; n++) {
    if (await page.locator("#pbq_match_p_message_b").count()) break;
    await page.locator("#exam_next").click();
  }
  for (const [id, value] of solution) await keyboardMatch(page, id, value);
  await page.locator("#lang_btn_en").click();
  await expect(page.locator("#pbq_match_p_message_b")).toHaveValue("pass_dkim");
  const next = page.locator("#exam_next");
  if (await next.isEnabled()) {
    await next.click(); await page.locator("#exam_previous").click();
  } else {
    await page.locator("#exam_previous").click(); await next.click();
  }
  await expect(page.locator("#pbq_match_p_message_b")).toHaveValue("pass_dkim");
  await page.locator("#exam_finish").click();
  await expect(page.locator("#exam_score")).toContainText(`1 / ${domainPbqCount}`);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("comptia_sy0701_quiz_history") ?? "[]"));
  expect(saved).toHaveLength(1);
  expect(saved[0]).toMatchObject({ score: 1, total: domainPbqCount, domains: [4] });
  await page.reload();
  await page.locator("#tab_btn_quiz").click();
  await expect(page.locator("#quiz_history_box")).toContainText(`/${domainPbqCount}`);
});
