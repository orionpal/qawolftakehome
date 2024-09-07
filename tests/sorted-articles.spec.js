// @ts-check
const { test, expect } = require('@playwright/test');
const { sortHackerNewsArticles } = require('../index');

const correctURL = process.env.DESIRED_TEST_URL;
const not_sorted_url = 'https://news.ycombinator.com/news';

test('Articles are sorted in newest', async ({ page }) => {
    const sorted = await sortHackerNewsArticles();
    expect(sorted).toBe(true);
});

test('Articles are not sorted in newest', async ({ page }) => {
    const sorted = await sortHackerNewsArticles(not_sorted_url);
    expect(sorted).toBe(false);
});