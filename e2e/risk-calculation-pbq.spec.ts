import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const solution = [
  ["ef_before", "ef_025"], ["sle_before", "sle_200k"], ["ale_before", "ale_80k"],
  ["sle_after", "sle_80k"], ["ale_after", "ale_8k"], ["benefit", "benefit_72k"],
  ["net", "net_54k"], ["treatment", "mitigate_review"],
];

async function choose(page: Page, id: string, value: string) {
  const select = page.locator(`#pbq_match_${id}`);
  await select.focus();
  await select.selectOption(value);
  await select.press("Tab");
  await expect(select).toHaveValue(value);
}

for (const lang of ["it", "en"] as const) {
  test(`${lang}: quantitative risk task works by keyboard without serious accessibility violations`, async ({ page }) => {
    await page.goto("/");
    await page.locator(`#lang_btn_${lang}`).click();
    await page.locator("#tab_btn_quiz").click();
    await page.locator("#sim_mode_practice").click();
    await page.locator("#pbq_start_308").focus();
    await page.locator("#pbq_start_308").press("Enter");
    await expect(page.getByRole("table")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(violations.filter(item => item.impact === "serious" || item.impact === "critical")).toEqual([]);
    for (const [id, value] of solution) await choose(page, id, value);
    await page.locator("#pbq_submit").press("Enter");
    await expect(page.locator("#pbq_feedback")).toContainText(lang === "it" ? "Tutto corretto" : "All correct");
    await page.locator("#pbq_next").click();
    await page.locator("#pbq_restart").click();
    for (const [id] of solution) await expect(page.locator(`#pbq_match_${id}`)).toHaveValue("");
  });
}
