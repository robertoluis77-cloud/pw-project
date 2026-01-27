import { expect, type Locator, type Page } from "@playwright/test"
import Collection from "@lariat/playwright"

export class SandboxAutomationTesting extends Collection {

    readonly browserPage: Page;

    readonly botones: {
        dinamico: Locator;
        enviar: Locator;
        diaDelaSemana: Locator;
        mostrarPopUp: Locator;

    };

    readonly botonDinamicoText: Locator;

    readonly checkBoxes: {
        pizza: Locator;
        hamburgersa: Locator;
        pasta: Locator;
        helado: Locator;
        torta: Locator;
    };

    readonly textBox: Locator;

    readonly radioButtons: {
        si: Locator;
        no: Locator;
    };

    readonly dropDwon: Locator;

    readonly opcionesDropDown: {
        futbol: Locator;
        tennis: Locator;
        basket: Locator;
    };

    readonly tables: {
        dinamica: Locator;
        static: Locator;
    };

    constructor(page: Page) {
        super(page.locator(""))
        this.browserPage = page;

        this.botones = {
            dinamico: this.browserPage.getByRole('button', { name: 'Hacé click para generar un ID' }),
            enviar: this.browserPage.getByRole('button', { name: 'Enviar' }),
            diaDelaSemana: this.browserPage.getByRole('button', { name: 'Día de la semana' }),
            mostrarPopUp: this.browserPage.getByRole('button', { name: 'Mostrar popup' })
        };

        this.checkBoxes = {
            pizza: this.browserPage.getByRole('checkbox', { name: 'Pizza 🍕' }),
            hamburgersa: this.browserPage.getByRole('checkbox', { name: 'Hamburguesa 🍔' }),
            pasta: this.browserPage.getByRole('checkbox', { name: 'Pasta 🍝' }),
            helado: this.browserPage.getByRole('checkbox', { name: 'Helado 🍧' }),
            torta: this.browserPage.getByRole('checkbox', { name: 'Torta 🍰' })
        };

        this.textBox = this.browserPage.getByRole('textbox', { name: 'Un aburrido texto' })

        this.botonDinamicoText = this.browserPage.locator('#hidden-element');

        this.radioButtons = {
            si: this.browserPage.getByRole('radio', { name: 'Si' }),
            no: this.browserPage.getByRole('radio', { name: 'No' })
        };

        this.dropDwon = this.browserPage.locator('#formBasicSelect');


        this.opcionesDropDown = {
            futbol: this.dropDwon.getByRole('option', { name: 'Fútbol' }),
            tennis: this.dropDwon.getByRole('option', { name: 'Tennis' }),
            //tennis: this.browserPage.locator('select#formBasicSelect > option:is(:text("Tennis"))'),
            basket: this.dropDwon.getByRole('option', { name: 'Basket' })
        };

        this.tables = {

            //dinamica = this.browserPage.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent))

            
            dinamica: this.browserPage.getByRole('heading', { name: 'Tabla dinámica' }).getByRole('table'),
            static: this.browserPage.getByRole('heading', { name: 'Tabla estática' })
                .filter({ has: this.browserPage.getByRole('table') })
                .getByRole('cell')

            
        };
    }

    async goto() {
    /*
    const baseURL = defineConfig?.use?.baseURL;
    if (!baseURL)
      throw new Error("baseURL is not defined in playwright.config.ts");
    */
    //await this.browserPage.setViewportSize({ width: 1800, height: 974 });
    await this.browserPage.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    await this.page.waitForURL(/sandbox-automation-testing/);
  }

  async close() {
    await this.browserPage.close();
  }


}