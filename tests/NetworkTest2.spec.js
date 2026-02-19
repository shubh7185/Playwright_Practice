const { test, expect, request } = require("@playwright/test");



test('Security Testt request Intercept',async({page})=>
{
        //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();

// Login and reach order page 

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69974a3c1fe6115f6a95fabc'})
)

await page.locator("button:has-text('View')").first().click();
await page.pause(); 





})