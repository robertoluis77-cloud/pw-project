import { test, expect } from '@playwright/test';

test('Text Inputs & Searchbox', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const enabledInputs = page.locator('input[type="text"]:not([disabled])');
  const enabledCount = await enabledInputs.count();
  if (enabledCount > 0) {
    await enabledInputs.first().fill('playwright');
    await expect(enabledInputs.first()).toHaveValue('playwright');
  } else {
    // fallback: try named inputs
    await page.fill('input[name="a"]', 'playwright').catch(() => { });
  }

  const disabledCount = await page.locator('input[disabled]').count();
  expect(disabledCount).toBeGreaterThanOrEqual(1);
});
