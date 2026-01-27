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

    test('Testing @TextBox', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);

        await test.step('Checking testbox is editable', async () => {

            await sbTestingPage.goto();
            //await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot11.png' });
            await expect(sbTestingPage.textBox).toBeEditable();
            await sbTestingPage.textBox.fill('Este es un texto de prueba');
            await expect(sbTestingPage.textBox).toHaveValue('Este es un texto de prueba');
            //await sbTestingPage.page.screenshot({ path: './SandboxAutomationScreensShots/screenshots/screenshot13.png' });
            await test.info().attach('Sandbox Automation Testing Page Screenshot for text box with text', {
                body: await sbTestingPage.page.screenshot(),
                contentType: 'image/png',
            });
        })
    })

    test('Testing @CheckBoxes', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);
        await sbTestingPage.goto();

        for (const checkBoxName in sbTestingPage.checkBoxes) {
            const checkBox = sbTestingPage.checkBoxes[checkBoxName as keyof typeof sbTestingPage.checkBoxes];

            await test.step('Checking CheckBoxes can be checked and unchecked for ' + checkBox, async () => {
                await checkBox.check();
                await expect(checkBox).toBeChecked();
                await test.info().attach('Sandbox Automation Testing Page Screenshot for checkbox checked', {
                    body: await sbTestingPage.page.screenshot(),
                    contentType: 'image/png',
                });
                await checkBox.uncheck();
                await expect(checkBox).not.toBeChecked();
                await test.info().attach('Sandbox Automation Testing Page Screenshot for for checkbox un-checked', {
                    body: await sbTestingPage.page.screenshot(),
                    contentType: 'image/png',
                });
            })
        }
    })

    test('Testing @RadioButtons', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);
        await sbTestingPage.goto();

        for (const radioButton in sbTestingPage.radioButtons) {
            const checkBox = sbTestingPage.radioButtons[radioButton as keyof typeof sbTestingPage.radioButtons];

            await test.step('Checking radioButtons can be checked and unchecked for ' + checkBox, async () => {
                await checkBox.check();
                await expect(checkBox, 'Radio Button expected to be checked').toBeChecked();
                await test.info().attach('Sandbox Automation Testing Page Screenshot for checkbox checked', {
                    body: await sbTestingPage.page.screenshot(),
                    contentType: 'image/png',
                });
            })
        }


    })

    test('Testing @DropDownOptions', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);
        await sbTestingPage.goto();
        const optionText = ["Tennis", "Fútbol", "Basketball"];

        for (const DropdownOption in optionText) {
            //const checkBox = sbTestingPage.opcionesDropDown[DropdownOptions as keyof typeof sbTestingPage.opcionesDropDown];

            await test.step('Checking dropdown options can be selected for this option ' + optionText[DropdownOption], async () => {
                console.log('Selecting option: ' + optionText[DropdownOption]);
                
                await sbTestingPage.dropDwon.selectOption(optionText[DropdownOption]);
                //await checkBox.click();
                //await page.$('select#formBasicSelect > option:is(:text("Tennis"))').click();
                //await expect(checkBox, 'Radio Button expected to be checked').toBeChecked();
                await test.info().attach('Sandbox Automation Testing Page Screenshot for dropdowns', {
                    body: await sbTestingPage.page.screenshot(),
                    contentType: 'image/png',
                });
                await await sbTestingPage.page.waitForTimeout(3000);
                await sbTestingPage.botones.enviar.click();

            })
        }


    })


    test('Testing @Tables', async ({ page }) => {

        const sbTestingPage = new SandboxAutomationTesting(page);
        await sbTestingPage.goto();

        for (const tables in sbTestingPage.tables) {
            const checkBox = sbTestingPage.tables[tables as keyof typeof sbTestingPage.tables];

            await test.step('Checking data from tables ' + checkBox, async () => {
                await sbTestingPage.dropDwon.click();
                const cells = await checkBox.locator('tbody tr td');
                const valoresTablaDinamica = await sbTestingPage.page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
                const valoresTablaStatica = await sbTestingPage.page.$$eval('h2:has-text("Tabla estática") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaStatica);
                await sbTestingPage.page.reload();
                
                //console.log(`Contents of ${tables} table:`, cells);
                await test.info().attach('Sandbox Automation Testing Page Screenshot for tables', {
                    body: await sbTestingPage.page.screenshot(),
                    contentType: 'image/png',
                });

            })
        }


    })


})
