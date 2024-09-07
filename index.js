// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

const desiredTestURL = process.env.DESIRED_TEST_URL;
const desiredTestArticles = parseInt(process.env.DESIRED_TEST_ARTICLES, 10);

export async function loadArticles(page, amount = desiredTestArticles, waitTime = 2500) {
  var allArticles = [];
  var neededArticles = amount - allArticles.length; 
  while (neededArticles > 0) {
    // Make sure loaded
    try {
      await page.waitForSelector('.athing', { timeout: 20000 });
    } catch {
      throw new Error('CANNOT FIND ARTICLES/THINGS');
    }
    // Add new articles
    const newArticles = await page.$$eval('.athing', (articles, neededArticles) =>
      articles.slice(0, neededArticles).map(article => {
        const timestampElement = article.nextElementSibling.querySelector('.age a');
        console.log(`${neededArticles}`)
        return {
          title: article.querySelector('.titleline > a').innerText,
          timestamp: timestampElement ? timestampElement.getAttribute('href').match(/(\d+)$/)[0] : null
        };
      }),
      neededArticles
    );
    newArticles.map(article => allArticles.push(article))
    neededArticles = amount - allArticles.length
    if (neededArticles > 0) { // Only try to load more if we know we're going through the loop again
      // Click the "More" button to load more articles
      await page.click('.morelink');
      // Wait a bit to make sure we don't send too many requests too quickly
      await page.waitForTimeout(waitTime);
    } 
  }
  
  return allArticles;
}

export async function sortHackerNewsArticles(url = desiredTestURL) {
  // launch browser
  const browser = await chromium.launch({ headless: true }); // Changed headless to true for github actions
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. go to Hacker News
  await page.goto(url).catch(() => { });
  // 2. get 100 articles
  const articles = await loadArticles(page, desiredTestArticles);
  if (articles.length !== desiredTestArticles) {
    console.log(`heyyyyy, this isn't 100 articles, this is ${articles.length}. Something may have went wrong with loading the articles`);
    return false;
  }

  // 3. Validate that the articles are sorted from newest to oldest
  for (let i = 0; i < articles.length - 1; i++) {
    const currentTimestamp = parseInt(articles[i].timestamp, 10);
    const nextTimestamp = parseInt(articles[i + 1].timestamp, 10);

    if (currentTimestamp < nextTimestamp) {
      console.log(`Articles are not sorted correctly: 
                   "${articles[i].title}" is older than "${articles[i + 1].title}"`);
      return false;
    }
  }

  console.log("The first 100 articles are correctly sorted from newest to oldest.");

  // Close browser
  await browser.close();
  return true
}

(async () => {
  await sortHackerNewsArticles();
})();