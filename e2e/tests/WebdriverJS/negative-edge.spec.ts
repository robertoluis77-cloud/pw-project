import { test, expect } from '@playwright/test';

test('Negative & Edge Cases', async ({ page, context }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  //await page.click('text=Klick #2').catch(() => { });

  /* If the test page got closed (popup/navigation), recover a working page
  if (page.isClosed()) {
    page = await context.newPage();
    await page.goto('https://guinea-pig.webdriver.io/');
  }
*/
  const klick2 = page.locator('text=Klick #2');
  await expect(klick2).toBeDisabled();

  await page.waitForTimeout(1000);

  const mainHeading = page.getByRole('heading', { name: 'WebdriverJS Testpage' });
  await expect(mainHeading).toBeVisible();
});
