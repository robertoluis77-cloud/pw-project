import { test, expect } from "playwright/test";

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  //await expect(page.getByRole('combobox', { name: 'Buscar' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Buscar' }).click();
  await page.getByRole('combobox', { name: 'Buscar' }).fill('playwright');
  //await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dplaywright%26sca_esv%3D37c453c1e71916bb%26source%3Dhp%26ei%3DNFJpaZXoKuPM0PEP3Z7QmAc%26iflsig%3DAFdpzrgAAAAAaWlgREMKmaQQEhvoaxcjsYh_NHqZC25d%26ved%3D0ahUKEwiV0vKUtY6SAxVjJjQIHV0PFHMQ4dUDCBQ%26uact%3D5%26oq%3Dplaywright%26gs_lp%3DEgdnd3Mtd2l6IgpwbGF5d3JpZ2h0MgsQABiABBixAxiDATIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiyRVD0DVi5M3ABeACQAQCYAW-gAf8HqgEDNC42uAEDyAEA-AEBmAILoAKiCKgCCsICChAAGAMYjwEY6gLCAgoQLhgDGI8BGOoCwgILEC4YgAQYsQMYgwHCAg4QLhiABBixAxjHARjRA8ICDhAAGIAEGIoFGLEDGIMBwgIIEAAYgAQYsQPCAggQLhiABBixA8ICDhAuGIAEGLEDGMcBGK8BwgIHEAAYgAQYCpgDA_EFAKmXXFLlUQqSBwMzLjigB_E6sgcDMi44uAeeCMIHBjAuMTAuMcgHFYAIAQ%26sclient%3Dgws-wiz%26sei%3DRlJpaYnFDKO2qtsPoP7f4QQ&q=EgSx8SGkGMakpcsGIjBM8UI9I8DbREVOGw8Rp_prJWvkbTpwWX8lyZbpvZ_DT4D3GVvsfpO0L3Uy_nHc5i4yAVJaAUM');
  //await page.locator('iframe[name="a-osz3otqmqw3n"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  //await page.locator('#center_col').click();
  //clerawait expect(page.getByRole('combobox', { name: 'Buscar' })).toBeVisible();
});