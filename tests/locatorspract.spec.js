const {test, expect} = require('@playwright/test');

test.only('Locators practice code ', async({page})=>
{


await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
// for checkboxes we can use botth check() and click()




})


test('Page  Playwright test', async ({page}) => { 

    // if we dont want to create this playwright provide fixture page that will help to open new context and page
    await page.goto("https://google.com");
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    

    
});