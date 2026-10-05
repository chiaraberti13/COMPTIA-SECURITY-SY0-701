import { expect, test, type Page } from "@playwright/test";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import type { AddressInfo } from "node:net";
import { offlineFiles } from "../scripts/offline-build";
import { createApp } from "../server/app";
import { createDailyBudget } from "../server/aiGuard";
import { STORAGE_KEYS } from "../src/storage";

async function ready(page: Page) {
  await expect(page.locator("#offline_status")).toContainText(/Pronto per studiare offline|Ready to study offline/, { timeout: 30_000 });
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}

for (const initial of ["it", "en"] as const) {
  test(`offline reload, language switch, quiz, PBQ and saved progress (${initial})`, async ({ page, context, baseURL }) => {
    test.slow();
    await page.addInitScript(lang => localStorage.setItem("comptia_sy0701_lang", lang), initial);
    await page.goto("/");
    await ready(page);
    await expect(page.locator("html")).toHaveAttribute("lang", initial);
    const checkbox = page.locator("#checklist_sidebar [role=checkbox]").first();
    await checkbox.click();
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    const checklist = await page.evaluate(() => localStorage.getItem("comptia_sy0701_checklist"));
    expect(checklist).not.toBeNull();
    // Warm health once: it must still fail without a network, never come from cache.
    expect(await page.evaluate(async () => (await fetch("/healthz")).status)).toBe(200);
    const cacheUrls = await page.evaluate(async () => {
      const keys = (await caches.keys()).filter(key => key.startsWith("comptia-sy0701-offline-v1-"));
      return (await Promise.all(keys.map(async key => (await (await caches.open(key)).keys()).map(request => request.url)))).flat();
    });
    expect(cacheUrls.some(url => /dataset-en-/.test(url))).toBe(true);
    expect(cacheUrls.some(url => /dataset-it-/.test(url))).toBe(true);
    expect(cacheUrls.some(url => /\/api(?:\/|$)|\/healthz/.test(url))).toBe(false);
    const apiRequests: string[] = [];
    page.on("request", request => { if (request.url().startsWith(`${baseURL}/api/`)) apiRequests.push(request.url()); });

    await context.setOffline(true);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#domain_guide_1")).toBeVisible();
    await expect(page.locator("#offline_status")).toContainText(/Sei offline|You are offline/);
    expect(await page.evaluate(() => localStorage.getItem("comptia_sy0701_checklist"))).toBe(checklist);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    const other = initial === "it" ? "en" : "it";
    await page.locator(`#lang_btn_${other}`).click();
    await expect(page.locator("html")).toHaveAttribute("lang", other);
    await page.locator("#tab_btn_glossary").click();
    await page.locator("#glossary_search_input").fill("SIEM");
    await expect(page.locator("#glossary_grid")).toContainText("SIEM");

    await page.locator("#tab_btn_pbq").click();
    await page.locator("#pbq_start_all").click();
    await expect(page.locator("#pbq_active")).toBeVisible();
    await expect(page.locator("#pbq_prompt")).not.toBeEmpty();
    await page.locator("#tab_btn_quiz").click();
    await page.getByRole("button", { name: /Mini/ }).first().click();
    await page.locator("#start_quiz_btn").click();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("1");
      if (await page.locator("#quiz_confirm_btn").isDisabled()) await page.keyboard.press("2");
      await page.keyboard.press("Enter");
      await expect(page.locator("#quiz_feedback_box")).toBeVisible();
      await page.keyboard.press("Enter");
    }
    await expect(page.locator("#quiz_completed_screen")).toBeVisible();
    const progress = await page.evaluate(keys => ({ history: localStorage.getItem(keys.quizHistory), questions: localStorage.getItem(keys.questionProgress) }), STORAGE_KEYS);
    expect(JSON.parse(progress.history ?? "[]").length).toBeGreaterThan(0);
    expect(Object.keys(JSON.parse(progress.questions ?? "{}")).length).toBe(10);
    if (await page.locator("#trigger_remediation_btn").isVisible()) await expect(page.locator("#trigger_remediation_btn")).toBeDisabled();

    if (!(await page.locator("#ai_sidebar").isVisible())) await page.locator("#toggle_sidebar_btn").click();
    await expect(page.locator("#ai_offline_notice")).toContainText(/Internet/);
    await page.locator("#chat_text_input").fill("Explain SIEM");
    await expect(page.locator("#chat_submit_btn")).toBeDisabled();
    await expect(page.locator("#chip_threats")).toBeDisabled();
    expect(apiRequests).toEqual([]);
    expect(await page.evaluate(async () => fetch("/healthz").then(() => true).catch(() => false))).toBe(false);

    // A second tab/deep link also boots offline; no memory-only resources.
    const second = await context.newPage();
    await second.goto(`${baseURL}/#guida/2/2.4`, { waitUntil: "domcontentloaded" });
    await expect(second.locator("#domain_guide_2")).toHaveAttribute("open", "");
    expect(await second.evaluate(() => localStorage.getItem("comptia_sy0701_quiz_history"))).toBe(progress.history);
    await second.close();
    await context.setOffline(false);
    await ready(page);
    await expect(page.locator("#chat_submit_btn")).toBeEnabled();
    expect(await page.locator("#chat_text_input").inputValue()).toBe("Explain SIEM");
  });
}

test("a completed update waits for the learner and preserves the running quiz until requested", async ({ page }) => {
  test.slow();
  const directory = mkdtempSync(join(tmpdir(), "offline-update-"));
  for (const file of [...offlineFiles("dist"), "/sw.js"]) {
    const destination = join(directory, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join("dist", file), destination);
  }
  const app = createApp({ isProduction: true, distPath: directory, model: "test", timeoutMs: 1000,
    budget: createDailyBudget(0), getApiKey: () => undefined,
    createClient: () => { throw new Error("AI unavailable in offline test"); }, logger: { log: () => {} } });
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    await page.goto(origin);
    await ready(page);
    await page.locator("#tab_btn_quiz").click();
    await page.getByRole("button", { name: /Mini/ }).first().click();
    await page.locator("#start_quiz_btn").click();
    const before = await page.locator("#main_quiz_question_screen").textContent();
    const script = readFileSync(join(directory, "sw.js"), "utf8").replace(/const CACHE = PREFIX \+ "[^"]+";/, 'const CACHE = PREFIX + "update-test-generation";');
    writeFileSync(join(directory, "sw.js"), script);
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
    await expect(page.locator("#offline_update_btn")).toBeVisible({ timeout: 30_000 });
    expect(await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.waiting?.state)).toBe("installed");
    expect(await page.locator("#main_quiz_question_screen").textContent()).toBe(before);
    await expect(page.locator("#quiz_completed_screen")).toBeHidden();
    try {
      await Promise.all([page.waitForEvent("load", { timeout: 20_000 }), page.locator("#offline_update_btn").click()]);
    } catch (error) {
      const diagnostic = await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        return { waiting: registration?.waiting?.state ?? null, active: registration?.active?.state,
          installing: registration?.installing?.state ?? null, caches: await caches.keys() };
      });
      console.log("Offline update lifecycle:", JSON.stringify(diagnostic));
      throw error;
    }
    await ready(page);
    await expect(page.locator("#offline_update_btn")).toBeHidden();
    const keys = await page.evaluate(async () => (await caches.keys()).filter(key => key.startsWith("comptia-sy0701-offline-v1-")));
    expect(keys.length).toBeLessThanOrEqual(2);
    expect(keys.some(key => key.endsWith("update-test-generation"))).toBe(true);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    rmSync(directory, { recursive: true, force: true });
  }
});
