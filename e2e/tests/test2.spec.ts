import { test, expect } from "playwright/test";

test('test', async ({ page }) => {
  // 1. Navigate to a web page
  await page.goto('https://www.playwright.dev/');

  // 2. Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});