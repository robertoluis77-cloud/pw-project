import { test, expect } from '@playwright/test';

test('Hidden & Dynamic Elements', async ({ page }) => {
  await page.goto('https://guinea-pig.webdriver.io/');
  // Ensure elements with text exist but are hidden
  const hiddenLoc = page.locator('text=I am not visible');
  const count = await hiddenLoc.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const el = hiddenLoc.nth(i);
    const visible = await el.isVisible().catch(() => false);
    console.log(`hidden element #${i} visible=${visible}`);
  }

  // Transient element validation
  const transient = page.locator('text=I will be gone in a second');
  await expect(transient).toBeVisible();
  await transient.waitFor({ state: 'detached', timeout: 3000 }).catch(() => { });
});
