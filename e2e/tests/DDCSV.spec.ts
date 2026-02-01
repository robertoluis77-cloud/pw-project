import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
// Import the synchronous parse function
import { parse } from 'csv-parse/sync';

// Define the shape of your data for type safety
interface LoginData {
    username: string;
    errorMsg: string;
    errorDisplayed: string;
}

// Function to read and parse the CSV file
const readCsvData = (filePath: string): LoginData[] => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.trim().split('\n').slice(1); // Skip header row
    return lines.map(line => {
        const [username, errorMsg, errorDisplayed] = line.split(',');
        return { username, errorMsg, errorDisplayed };
    });
};

// Read and parse the CSV file
const csvPath = path.join(__dirname, './TestData/TestData.csv');
const records = readCsvData(csvPath);

// Debug: Log parsed records to verify data
console.log('Parsed records:', records);

for (const record of records) {
    test('Login attempt for user: ' + record.username, async ({ page }) => {
        await page.goto('https://conduit.bondaracademy.com/login');
        await page.getByPlaceholder('Email').fill(record.username);
        await page.getByPlaceholder('Password').fill('HelloWorld');
        await page.click('button[type="submit"]');

        // Assertions based on the expected outcome from the CSV
        if (record.errorDisplayed === 'true') {
            await expect(page.locator('.error-messages')).toContainText(record.errorMsg);
        } else {
            await expect(page.locator('.error-messages')).not.toContainText(record.errorMsg);
        }
    });
}