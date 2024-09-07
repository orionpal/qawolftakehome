const { test, expect } = require('@playwright/test');

const correctURL = process.env.DESIRED_TEST_URL;

test('Website loads correctly', async ({ page }) => {
    await page.goto(String(correctURL));
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Hacker News');
});