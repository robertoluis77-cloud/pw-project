import { test, expect } from '@playwright/test';

test('Page Load & Main Heading', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  await expect(page).toHaveTitle('WebdriverJS Testpage');
  const mainHeading = page.getByRole('heading', { name: 'WebdriverJS Testpage' });
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText('WebdriverJS Testpage');
});
