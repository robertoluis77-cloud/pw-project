import { test, expect } from '@playwright/test';

test('Checkboxes and Radios', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const checkboxes = page.locator('input[type=checkbox]');
  await expect(checkboxes.first()).toBeChecked();
  await checkboxes.nth(1).check();
  await expect(checkboxes.nth(1)).toBeChecked();

  const radios = page.locator('input[type=radio]');
  await radios.nth(1).check();

  let anyChecked = false;
  for (let i = 0; i < await radios.count(); i++) {
    if (await radios.nth(i).isChecked()) { anyChecked = true; break; }
  }
  expect(anyChecked).toBeTruthy();
});
