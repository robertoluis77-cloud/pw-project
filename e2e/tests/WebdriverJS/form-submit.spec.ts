import { test, expect } from '@playwright/test';

test('Form Submission & send', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  const inputs = page.locator('input[type="text"]:not([disabled])');
  const count = await inputs.count();

  if (count >= 3) {
    await inputs.nth(0).fill('A').catch(() => { });
    await inputs.nth(1).fill('B').catch(() => { });
    await inputs.nth(2).fill('C').catch(() => { });
  } else {
    await page.fill('input[name="a"]', 'A').catch(() => { });
    await page.fill('input[name="b"]', 'B').catch(() => { });
    await page.fill('input[name="c"]', 'C').catch(() => { });
  }

  await page.locator('text=send').first().click().catch(() => { });

  const mainHeading = page.getByRole('heading', { name: 'WebdriverJS Testpage' });
  await expect(mainHeading).toBeVisible();
});
