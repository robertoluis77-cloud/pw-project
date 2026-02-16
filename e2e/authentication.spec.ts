/**
 * Authentication test suite for the Swag Labs web application (https://www.saucedemo.com/).
 *
 * @file Authentication Playwright E2E tests.
 * @module Authentication
 *
 * @description
 * Provides end-to-end tests verifying core login behaviors:
 * - Valid Login
 *   - Credentials: "standard_user" / "secret_sauce"
 *   - Expectation: Redirect to inventory and "Products" is visible.
 * - Invalid Login
 *   - Credentials: "invalid_user" / "invalid_pass"
 *   - Expectation: Error "Epic sadface: Username and password do not match any user in this service" is visible.
 * - Locked Out User
 *   - Credentials: "locked_out_user" / "secret_sauce"
 *   - Expectation: Error "Epic sadface: Sorry, this user has been locked out." is visible.
 *
 * @remarks
 * - Test setup: navigates to the login page before each test (page.goto).
 * - Test teardown: clears cookies and closes the browser context after each test (context.clearCookies, context.close).
 * - Uses Playwright fixtures: `page` for actions/assertions and `context` for cleanup.
 * - File path: /Users/robertob/eclipse-workspace/playwright/playwright_project/e2e/authentication.spec.ts
 * - Related test plan: e2e/TestPlans/Swag Labs Web Application – Test Plan.md
 * - Seed file: e2e/seed.spec.ts
 *
 * @see https://www.saucedemo.com/
 * @example
 * // Run this specific spec:
 * // npx playwright test e2e/authentication.spec.ts
 */
// spec: e2e/TestPlans/Swag Labs Web Application – Test Plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('https://www.saucedemo.com/');
  });

  test.afterEach(async ({ context }) => {
    // Clear cookies and close browser context after each test
    await context.clearCookies();
    await context.close();
  });

  test('Valid Login', async ({ page }) => {
    // 1.1 Valid Login: Enter valid username and password
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    // 1.1 Valid Login: Click Login
    await page.getByTestId('login-button').click();
    // 1.1 Valid Login: Verify successful login and redirection to inventory page
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('Invalid Login', async ({ page }) => {
    // 1.2 Invalid Login: Enter invalid username/password
    await page.getByTestId('username').fill('invalid_user');
    await page.getByTestId('password').fill('invalid_pass');
    // 1.2 Invalid Login: Click Login
    await page.getByTestId('login-button').click();
    // 1.2 Invalid Login: Verify error message is displayed
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

  test('Locked Out User', async ({ page }) => {
    // 1.3 Locked Out User: Enter locked out user credentials
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    // 1.3 Locked Out User: Click Login
    await page.getByTestId('login-button').click();
    // 1.3 Locked Out User: Verify locked out error message
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
  });
});
