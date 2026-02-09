import { test, expect } from '@playwright/test';

test.describe('WebdriverJS Testpage', () => {
  test('seed', async ({ page }) => {
    // generate code here.
    await page.goto('https://guinea-pig.webdriver.io/');
  });
});
