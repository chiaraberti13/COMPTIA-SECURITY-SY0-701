import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests against the production build (dist/server.cjs), on a
 * desktop and a phone viewport. Run `npm run build` first, then `npm run e2e`.
 *
 * The server starts with a fake Gemini key and AI_DAILY_LIMIT=0, so no test can
 * reach the paid API. PW_CHROMIUM_PATH lets a machine reuse a Chromium that is
 * already installed instead of downloading Playwright's own.
 */
const PORT = 4180;
const chromiumPath = process.env.PW_CHROMIUM_PATH;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // No retries: a flaky end-to-end test is a bug to fix, not to hide.
  retries: 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    locale: "it-IT",
    trace: "retain-on-failure",
    ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node dist/server.cjs",
    url: `http://127.0.0.1:${PORT}/healthz`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      NODE_ENV: "production",
      PORT: String(PORT),
      GEMINI_API_KEY: "e2e-fake-key",
      AI_DAILY_LIMIT: "0",
    },
  },
});
