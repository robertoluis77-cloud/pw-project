import { test, expect } from '@playwright/test';

test('Accessibility & Keyboard Navigation', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const active = await page.evaluate(() => document.activeElement?.tagName || '');
  expect(active.length).toBeGreaterThan(0);
});
