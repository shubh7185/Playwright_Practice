const {test,expect} = require("@playwright/test") 

test("More validation on hidden elements",async({page})=>
{
    // methods for navigation
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();







})



