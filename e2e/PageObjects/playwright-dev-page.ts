import { expect, type Locator, type Page } from "@playwright/test";
//import defineConfig from "../../playwright.config.ts";

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly getPomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
    this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" });
    this.getPomLink = page
      .locator("li", {
        hasText: "Guides",
      })
      .locator("a", {
        hasText: "Page object model",
      });
    this.tocList = page.locator("article div.markdown ul > li > a");
  }

  async goto() {
    /*
    const baseURL = defineConfig?.use?.baseURL;
    if (!baseURL)
      throw new Error("baseURL is not defined in playwright.config.ts");
    */
    await this.page.goto('');
    await this.page.waitForURL(/playwright.dev/);
  }

  async close() {
    await this.page.close();
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.getPomLink.click();
  }
}
