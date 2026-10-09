import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function configure(page: Page, total = 2) {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.locator("#tab_btn_quiz").click();
  for (let d = 1; d <= 5; d++) {
    const slider = page.locator('input[type="range"]').nth(d - 1);
    await slider.focus();
    await slider.press("Home");
    if (d === 3) for (let n = 0; n < total; n++) await slider.press("ArrowRight");
  }
  await page.locator("#exam_pbq_count").selectOption("1");
  await expect(page.locator("#start_exam_btn")).toBeEnabled();
}
async function currentMatching(page: Page) {
  // Domain 3 has three matching PBQs; detect which one the random draw placed.
  if (await page.locator("#pbq_match_p_remote").count()) {
    return {
      first: "p_remote", value: "remote_tls", objective: "3.2", total: 7,
      rest: [["p_sites", "site_ipsec"], ["p_mode", "esp_tunnel"], ["p_boundary", "beyond_gateway"], ["p_remote_auth", "remote_auth"], ["p_peer_auth", "ike_auth"], ["p_scope", "selected_traffic"]],
    };
  }
  if (await page.locator("#pbq_match_payments").count()) {
    return {
      first: "payments", value: "a", objective: "3.4", total: 7,
      rest: [["orders", "b"], ["archive", "c"], ["limits", "limits"], ["point", "loss"], ["copies", "copies"], ["sites", "capacity"]],
    };
  }
  return {
    first: "p_rest", value: "atrest", objective: "3.3", total: 4,
    rest: [["p_transit", "tls"], ["p_test", "mask"], ["p_leak", "dlp"]],
  };
}
async function noAxeErrors(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(violations.filter(v => v.impact === "serious" || v.impact === "critical").map(v => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
}

test("mixed exam keeps answers when skipping, reveals feedback only on submission and saves one result", async ({ page }) => {
  await configure(page);
  await page.locator("#timer_toggle_input").check();
  await page.locator("#start_exam_btn").click();
  await expect(page.locator("#exam_timer")).toContainText(/(?:2:00|1:\d{2})/);
  await expect(page.locator("#exam_current")).toContainText("PBQ");
  await expect(page.locator("#exam_explanation")).toHaveCount(0);
  const task = await currentMatching(page);
  const firstSelect = page.locator(`#pbq_match_${task.first}`);
  await firstSelect.focus();
  await firstSelect.press("a");
  await firstSelect.selectOption(task.value);
  await page.locator("#exam_flag").focus();
  await page.locator("#exam_flag").press("Enter");
  await expect(page.locator("#exam_flag")).toHaveAttribute("aria-pressed", "true");
  await page.locator("#exam_next").click();
  await expect(page.locator("#exam_current")).toContainText("MCQ");
  await page.locator("#exam_option_0").click();
  await page.locator("#exam_previous").click();
  await expect(firstSelect).toHaveValue(task.value);
  for (const [prompt, value] of task.rest) {
    await page.locator(`#pbq_match_${prompt}`).selectOption(value);
  }
  await expect(page.locator("#exam_explanation")).toHaveCount(0);
  await noAxeErrors(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  await page.locator("#exam_finish").focus();
  await page.locator("#exam_finish").press("Enter");
  await expect(page.locator("#exam_results")).toBeVisible();
  await expect(page.locator("#exam_explanation")).toBeVisible();
  await expect(page.locator("#exam_objectives")).toContainText(task.objective);
  await expect(page.locator("#exam_domains")).toContainText("/2");
  await noAxeErrors(page);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("comptia_sy0701_quiz_history") ?? "[]"));
  expect(saved).toHaveLength(1);
  expect(saved[0]).toMatchObject({ total: 2, domains: [3] });
  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem("comptia_sy0701_question_progress_v1") ?? "{}"));
  expect(Object.keys(progress)).toHaveLength(1);
  await page.locator("#exam_configure").click();
  await expect(page.locator("#quiz_history_box")).toContainText("/2");
  await page.reload();
  await page.locator("#tab_btn_quiz").click();
  await expect(page.locator("#quiz_history_box")).toContainText("/2");
});

test("PBQ-only exam works offline in English, reports unanswered work and can repeat", async ({ page, context }) => {
  await configure(page, 1);
  await page.locator("#start_exam_btn").click();
  await expect(page.locator("#exam_current")).toContainText("PBQ");
  const task = await currentMatching(page);
  await page.locator(`#pbq_match_${task.first}`).selectOption(task.value);
  await page.locator("#lang_btn_en").click();
  await expect(page.locator("#exam_screen > h2")).toHaveText("Exam mode: MCQs and PBQs");
  await expect(page.locator(`#pbq_match_${task.first}`)).toHaveValue(task.value);
  await context.setOffline(true);
  await page.locator("#exam_finish").click();
  await expect(page.locator("#exam_score")).toContainText("0 / 1");
  await expect(page.locator("#exam_results")).toContainText("Incomplete or missing answers: 1.");
  await expect(page.locator("#exam_objectives")).toContainText(task.objective);
  await expect(page.locator("#exam_explanation")).toContainText(`1 of ${task.total} correct`);
  await noAxeErrors(page);
  await page.locator("#exam_repeat").click();
  await expect(page.locator("#exam_results")).toHaveCount(0);
  // Repeat draws a fresh random exam; it may choose the other domain-3 PBQ.
  const repeatedTask = await currentMatching(page);
  await expect(page.locator(`#pbq_match_${repeatedTask.first}`)).toHaveValue("");
  await context.setOffline(false);
});
