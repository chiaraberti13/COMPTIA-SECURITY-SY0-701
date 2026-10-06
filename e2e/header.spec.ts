import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const controls = ["tab_btn_studio", "tab_btn_glossary", "tab_btn_quiz", "tab_btn_pbq", "tab_btn_flash", "toggle_sidebar_btn", "lang_btn_it", "lang_btn_en"];

// Notebook widths straddle the former lg breakpoint, where the fixed-height
// wrapping header pushed the language switch below its border.
for (const width of [320, 390, 768, 1024, 1280, 1366, 1440, 1536, 1920]) {
  test(`header contains every control without collisions at ${width}px in IT and EN`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const language of ["it", "en"]) {
      await page.locator(`#lang_btn_${language}`).click();
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      const geometry = await page.evaluate((ids) => {
        const header = document.getElementById("app_header")!.getBoundingClientRect();
        const boxes = ids.map((id) => {
          const element = document.getElementById(id)!;
          const r = element.getBoundingClientRect();
          return { id, top: r.top, bottom: r.bottom, left: r.left, right: r.right, clipped: element.scrollWidth > element.clientWidth };
        });
        const overlapping = boxes.flatMap((a, i) => boxes.slice(i + 1).filter((b) =>
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1).map((b) => `${a.id}/${b.id}`));
        return { outside: boxes.filter((r) => r.top < header.top || r.bottom > header.bottom || r.left < 0 || r.right > innerWidth).map((r) => r.id),
          clipped: boxes.filter((r) => r.clipped).map((r) => r.id), overlapping,
          overflow: document.documentElement.scrollWidth > innerWidth,
          titleClipped: document.getElementById("header_title")!.scrollWidth > document.getElementById("header_title")!.clientWidth };
      }, controls);
      expect(geometry.outside).toEqual([]);
      expect(geometry.clipped).toEqual([]);
      expect(geometry.overlapping).toEqual([]);
      expect(geometry.overflow).toBe(false);
      if (width >= 768) expect(geometry.titleClipped).toBe(false);
      for (const id of controls) await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 1 });
    }
  });
}

test("header navigation works by keyboard with visible selected state and accessible controls", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  await page.locator("#tab_btn_studio").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#tab_btn_glossary")).toBeFocused();
  await expect(page.locator("#tab_btn_glossary")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#glossary_root")).toBeVisible();
  await page.keyboard.press("End");
  await expect(page.locator("#tab_btn_flash")).toBeFocused();
  await expect(page.locator("#flash_start_all")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator("#toggle_sidebar_btn")).toBeFocused();
  const { violations } = await new AxeBuilder({ page }).include("#app_header")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(violations).toEqual([]);
});
