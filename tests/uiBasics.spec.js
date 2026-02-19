const {test, expect} = require('@playwright/test');
const { request } = require('http');
const { promiseHooks } = require('v8');

// test('First Playwright test', async function(){
//     // /await will get activated only when we mark function async only id didn't mark then there is no use 

// });
// using anyonmus function
test.only('Browser context Playwright test', async ({browser}) => { 
   
    // await will get activated only when we mark function async only id didn't mark then there is no use 
    // browser.newContext it will help you to open fresh browser like incognito to remove the pre used cookies 
    const context =  await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css',
        route=> route.abort()
    );


    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signButton = page.locator("#signInBtn");

    const cardTitles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
// When we are dealing with locators we mostly used CSS 
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signButton.click();
    console.log(await page.locator("[style='display: block;']").textContent());

    await expect(page.locator("[style='display: block;']")).toContainText('Incorrect username/password.');
    // Now we clean the input box
    await userName.fill(""); // it clear the existing content
    await userName.fill("rahulshettyacademy")
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signButton.click();
//  1st method
    console.log(await cardTitles.nth(0).textContent()); // it will give the first attribute name out of 4 from array by using (nth(0))
    // 2nd method
    console.log( await cardTitles.first().textContent());    

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});

// test('Page  Playwright test', async ({page}) => { 

//     // // if we dont want to create this playwright provide fixture page that will help to open new context and page
//     // await page.goto("https://google.com");
//     // // get title - assertion
//     // console.log(await page.title());
//     // await expect(page).toHaveTitle("Google");
    

    
// });

test('UI controls', async ({page}) => { 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signButton = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck(); // to uncheck the box
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // when we want to check the false value will return or not

    // await is only required when we are performing actions 

    // Now we put assertion on attribute for blinking text if it contain that text means it is blinking if not no blinking
    await expect(documentLink).toHaveAttribute('class','blinkingText');


    // page.locator(".radiotextsty").nth(1).isChecked() // it will return boolean value 
    await page.pause();
    // await signButton.click();
});

test('Child windows ', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage]= await Promise.all( // whenever we want ot execute parelly we tied into an array using this  
    [
        context.waitForEvent('page'), // listen for any new page open
        documentLink.click(),

    ] ) // new page is open
// promise mare new page return karega isleya mana usa const ma define kardiya
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain= arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    await page.pause();
    // await page.locator("#username").textContent()


})
    

    
// });

// test.only is use when we want to specificly run only that test
// npx is the path pointing to playwright module in node folder