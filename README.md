# Introduction
Hello! My name is Orion Palaquibay and I'm applying for a role at QA wolf! In this document I explain a bit about my solution and provide the desired information.

1. Country/State = USA/New York

2. Found job through handshake

## Question 1: Using Playright, validate that EXACTLY the first 100 articles are sorted from newest to oldest

### To Run
You have three options:
1. run the index.js file directly
    - ```npm i```
    - ```node index.js```
2. run the playwright tests and view the results
    - ```npm i```
    - ```npx playwright test```
    - ```npx playwright show-report```
3. push changes to github and view tests through the automated github actions

### flow for validation
1. go to website
2. get 100 articles
3. validate that upload date is in descending order (newest -> oldest)

### Utilizing PlayWright Tests:
1. Sanity tests for making sure we can connect to hackernews
2. tests for making sure we can load articles, and that we expect an error if we can't
3. tests for checking if articles are sorted and returning appropriate true/false

## Structure
#### Main functions:
- loadArticles(page, amount = desiredTestArticles, waitTime = 2500)
    - because of the structure of Hacker News pages, each page only holds 30 articles. for any amount > 30 we need to click the "more" button, and the waitTime is how much time to wait before clicking the button again. The wait time is necessary because the page can error out if you try too many times too quickly
- sortHackerNewsArticles(url = desiredTestURL)

#### Testing:
- Environment variables (for easy changing to the tests):
    - desiredTestArticles = 100
    - desiredTestURL = https://news.ycombinator.com/newest
- Tests:
    - load-website
        - Sanity check for making sure we're online and the site is online
    - load-articles
        - Make sure we don't have issues loading articles, and that we expect an error if we can't load them
    - sorted-articles
        - Make sure we appropriately return true/false if the desired number of articles (100) are sorted
- Automation
    - After looking up the tech stach for QA wolf, I saw that github actions was used. I implemented a simple github action to run the playwright tests on push/pull of this repo
