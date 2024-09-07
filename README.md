# GOAL: Using Playright, validate that EXACTLY the first 100 articles are sorted from newest to oldest

flow for test:
1. go to website
    - hopefully we're online
2. get 100 articles
    - timeout if loading too fast
3. validate that upload date is in descending order

Utilizing PlayWright Tests:


working it out
- already given how to go to website
- Finding out how to extract the articles
    - inspecting the webpage
    - finding the class for each article being "athing"
    - only 30 are shown at a time, there's a "more" button we can click for more
