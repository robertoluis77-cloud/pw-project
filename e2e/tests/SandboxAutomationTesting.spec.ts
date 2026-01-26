import { test, expect } from '@playwright/test';
import { SandboxAutomationTesting } from "../PageObjects/sandbox-automation-testing.page"

test.afterEach(async ({ page }) => {
    page.on('console', msg => {
        if (msg.type() === 'error')
            console.log(`Error text: "${msg.text()}"`);
    });

    console.log(`Finished ${test.info().title} with status ${test.info().status}`);

    if (test.info().status !== test.info().expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);

})

test.describe('@Sandbox Automation Testing web elements', () => {
    /*
        test.beforeAll(async ({ page }) => {
            const sbTestingPage = new SandboxAutomationTesting(page);
            await sbTestingPage.goto();
            await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot11.png' });
        })
            */

    test('@Accessing to dinamic button', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);

        await test.step('@Accessing to Sandbox Automation Testing Web elements page', async () => {

            await sbTestingPage.goto();
            await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot11.png' });
            await test.info().attach('Sandbox Automation Testing Page Screenshot', {
                body: await sbTestingPage.page.screenshot(),
                contentType: 'image/png',
            });
        })

        await test.step('Clicking on dinamic button', async () => {

            await sbTestingPage.botones.dinamico.click();
            await expect(sbTestingPage.botonDinamicoText).toBeVisible();
            await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot12.png' });
            await test.info().attach('Sandbox Automation Testing Page Screenshot showing dinamic button text', {
                body: await sbTestingPage.page.screenshot(),
                contentType: 'image/png',
            });
        })

    })

    test('Test 2', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);

        await test.step('@Accessing to Sandbox Automation Testing Web elements page', async () => {

            await sbTestingPage.goto();
            await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot11.png' });
            await test.info().attach('Sandbox Automation Testing Page Screenshot for Test 2', {
                body: await sbTestingPage.page.screenshot(),
                contentType: 'image/png',
            });
        })
    })



})
