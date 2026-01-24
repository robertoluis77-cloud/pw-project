import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from "../PageObjects/playwright-dev-page"

test.afterEach(async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error')
      console.log(`Error text: "${msg.text()}"`);
  });

  console.log(`Finished ${test.info().title} with status ${test.info().status}`);

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);

})


test('Getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.page.screenshot({ path: './screenshots/screenshot11.png' });
  await playwrightDev.getStarted();
  await expect(playwrightDev.page).toHaveTitle(/Installation/);
  await playwrightDev.page.screenshot({ path: './screenshots/screenshot2.png' });
  await expect(playwrightDev.tocList).toHaveText([
    "How to install Playwright",
    "What's installed",
    "How to run the example test",
    "How to open the HTML test report",
    "Write tests using web-first assertions, fixtures and locators",
    "Run single or multiple tests; headed mode",
    "Generate tests with Codegen",
    "View a trace of your tests"
  ]);
});

test('Should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await playwrightDev.page.screenshot({ path: './screenshots/screenshot3.png' });
  await expect(playwrightDev.page.locator('article')).toContainText('Page Object Model is a common pattern');
  //console.log(process.env);
  await expect(playwrightDev.page).toHaveTitle(/Page object models/);
  playwrightDev.close();

});