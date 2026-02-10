import { test, expect } from '@playwright/test';

test('Responsive Layout', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const mainHeading = page.getByRole('heading', { name: 'WebdriverJS Testpage' });

  await page.setViewportSize({ width: 375, height: 800 });
  await expect(mainHeading).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(mainHeading).toBeVisible();
});
