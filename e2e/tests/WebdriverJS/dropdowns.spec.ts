import { test, expect } from '@playwright/test';

test('Dropdowns / Comboboxes', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const first = page.locator('select').first();
  await expect(first).toHaveValue('2');
  await first.selectOption({ value: '1' }).catch(() => first.selectOption({ index: 0 }));
  await expect(first).toHaveValue('1');

  const second = page.locator('select').nth(1);
  const initialLabel = (await second.locator('option:checked').textContent())?.trim();
  expect(initialLabel).toBe('uno');

  await second.selectOption({ label: 'tres' }).catch(() => second.selectOption({ index: 2 }));
  const afterLabel = (await second.locator('option:checked').textContent())?.trim();
  expect(afterLabel).toBe('tres');
});
