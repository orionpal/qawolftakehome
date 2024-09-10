// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
require('dotenv').config();  // Load environment variables from .env

const desiredTestURL = process.env.DESIRED_TEST_URL;
const desiredTestArticles = parseInt(process.env.DESIRED_TEST_ARTICLES, 10);

const itemSelector = '.athing';

async function loadArticles(page, amount = desiredTestArticles, waitTime = 1248) {
  var allArticles = [];
  var neededArticles = amount - allArticles.length; 
  while (neededArticles > 0) {
    // Make sure loaded
    try {
      await page.waitForSelector(itemSelector, { timeout: 15000 });
    } catch (error) {
      console.log(error)
      throw new Error(`TIMEOUT: Possible Issue: Can't find articles. No selector ${itemSelector} on page.`);
    }
    try {
      // Add new articles
      const newArticles = await page.$$eval(itemSelector, (articles, neededArticles) =>
        articles.slice(0, neededArticles).map(article => {
          const timestampElement = article.nextElementSibling.querySelector('.age');
          return {
            title: article.querySelector('.titleline > a').innerText,
            timestamp: timestampElement ? new Date(timestampElement.getAttribute('title')) : null
          };
        }),
        neededArticles
      );
      newArticles.map(article => allArticles.push(article));
    } catch (error){
      console.log(error);
      throw new Error(`CANNOT FIND TIMESTAMPED ARTICLES. No selector '.age' on page.`);
    }
    
    neededArticles = amount - allArticles.length;
    if (neededArticles > 0) { // Only try to load more if we know we're going through the loop again
      // Click the "More" button to load more articles
      await page.click('.morelink');
      // Wait a bit to make sure we don't send too many requests too quickly
      await page.waitForTimeout(waitTime);
    } 
  }
  
  return allArticles;
}

async function sortHackerNewsArticles(page, url = desiredTestURL) {
  // 1. go to Hacker News
  await page.goto(url)
  // 2. get 100 articles
  const articles = await loadArticles(page, desiredTestArticles);
  if (articles.length !== desiredTestArticles) {
    console.log(`heyyy, this isn't ${desiredTestArticles} articles, this is ${articles.length}! Something may have went wrong with loading the articles. Potential issues may be: requesting too many too fast; loading the wrong website;`);
    return false;
  }

  // 3. Validate that the articles are sorted from newest to oldest
  for (let i = 0; i < articles.length - 1; i++) {
    const currentTimestamp = articles[i].timestamp ? articles[i].timestamp.getTime() : null; // Null so we get an error if we can't load timestamps
    const nextTimestamp = articles[i + 1].timestamp ? articles[i + 1].timestamp.getTime() : null;

    if (currentTimestamp < nextTimestamp) {
      console.log(`Articles are not sorted correctly: 
                   "${articles[i].title}" is older than "${articles[i + 1].title}"`);
      return false;
    }
  }

  console.log("The first 100 articles are correctly sorted from newest to oldest.");


  return true
}

// launch browser


// Export functions for use in tests
module.exports = {
  loadArticles,
  sortHackerNewsArticles
};

// If this script is run directly, execute the sorting function
if (require.main === module) {
  (async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await sortHackerNewsArticles(page);
    // // Close browser
    await browser.close();
  })();
}