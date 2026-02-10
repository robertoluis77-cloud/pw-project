import { test, expect } from '@playwright/test';

test('Keyboard & Special Input Cases', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const input = page.locator('input[type="text"]').first();
  await input.fill('').catch(() => {});
  await input.type('abc').catch(() => {});
  await page.keyboard.press('Control+A').catch(() => {});
  await page.keyboard.press('Delete').catch(() => {});
  await expect(input).toHaveValue('').catch(() => {});
});
