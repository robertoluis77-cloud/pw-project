import { test, expect } from '@playwright/test';

test('Links and Navigation', async ({ page, context }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  await expect(page.locator('text=GitHub Repo')).toBeVisible();
  const [newPage] = await Promise.all([
    context.waitForEvent('page').catch(() => null),
    page.click('text=open new tab'),
  ]);
  if (newPage) await expect(newPage).toBeTruthy();
  await page.click('text=Hello');
  await expect(page).toHaveURL(/#/);
});
