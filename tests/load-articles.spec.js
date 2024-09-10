const { test, expect } = require('@playwright/test');
const { loadArticles } = require('../index');

const correctURL = process.env.DESIRED_TEST_URL;
const noArticlesURL = 'https://news.ycombinator.com/submit';

const correctNumberOfArticles = parseInt(process.env.DESIRED_TEST_ARTICLES, 10);
const tooMany = 1000

test('Articles load correctly', async ({ page }) => {
    await page.goto(correctURL);
    const articles = await loadArticles(page, correctNumberOfArticles);
    expect(articles.length).toBe(correctNumberOfArticles);
});

test('Error: Cannot find Articles', async ({ page }) => {
    await page.goto(noArticlesURL);
    await expect(loadArticles(page, correctNumberOfArticles)).rejects.toThrow('TIMEOUT: Possible Issue:');
});

test('Possible Error: Too many articles to load, requests too fast', async ({ page }) => {
    try {
        await page.goto(correctURL);
        const articles = await loadArticles(page, tooMany, 1);
        expect(articles.length).toBe(tooMany);
    } catch (error) {
        expect(error.message).toContain('TIMEOUT: Possible Issue:');
    }
});