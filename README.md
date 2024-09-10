# Hacker News Article Validation with Playwright

Hello! My name is Orion Palaquibay, and I'm applying for a role at QA Wolf. This repository demonstrates a solution that validates whether the first 100 articles on Hacker News are sorted from newest to oldest using Playwright.


---

## How to Run the Project

You have three options for running this solution:

### 1. Running the `index.js` File Directly

```bash
npm i
node index.js
```
### 2. Running Playwright Tests and Viewing the Results

```bash
npm i
npx playwright test
npx playwright show-report
```

### 3. Automated Testing via GitHub Actions

Push your changes to the repository, and GitHub Actions will automatically run the tests.

---

## Solution Flow for Validation
- **Step 1:** _Navigation_: Navigate to Hacker News Newest Articles.
- **Step 2:** _Collection_: Collect the first 100 articles across multiple pages.
- **Step 3:** _Validate Sorting_: Check if the articles are sorted in descending order by upload date.

### Utilizing Playwright Tests

The Playwright tests include:

1. Sanity Checks: Ensures that we can connect to Hacker News.
2. Article Loading: Ensures we can load articles or return an error if we can't.
3. Sorting Validation: Function correctly returns true/false based on Articles being sorted.

_note:_ The config was changed to include a single retry attempt on local run because I was running into an issue where one test would randomly fail, but on a single retry I have yet to have both attempts fail.

The browsers enabled are:
- Chromium
- Google Chrome
- Firefox
- Safari (webkit)
- Mobile Chrome
- Mobile Safari

_note:_ microsoft edge is not enabled because I don't want to download it for my macbook. The other mobile browsers were enabled because I saw that your company recently launched mobile app testing!

### Testing Environment Variables

The following environment variables can be adjusted for testing:

    DESIRED_TEST_ARTICLES: The number of articles to load (default: 100).
    DESIRED_TEST_URL: The Hacker News URL (default: https://news.ycombinator.com/newest).

### Project Structure
#### Main Functions

- loadArticles(page, amount = desiredTestArticles, waitTime = 2500)
    - Loads articles from Hacker News, with a wait time between page loads to avoid errors caused by too many rapid requests.
- sortHackerNewsArticles(url)
    - Validates that the articles are sorted from newest to oldest. Defaults to environment variable URL

#### Added Test Files
- load-website.spec.js
- load-articles.spec.js
- sorted-articles.spec.js

### Automation with GitHub Actions

I’ve implemented a GitHub Actions workflow to automatically run the Playwright tests on every push or pull request. This setup ensures the tests are continuously validated, aligning with the technology stack QA Wolf uses.

View the Results: After pushing to the repository, the tests will run automatically, and you can view the results by following the GitHub Actions page.

### Conclusion

This solution demonstrates my ability to set up end-to-end testing and automation using Playwright, validating real-world content in a structured, repeatable manner.