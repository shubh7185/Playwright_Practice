const {test,expect} = require("@playwright/test") 

test("More validation on hidden elements",async({page})=>
{
    // methods for navigation
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator(".displayed-class")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator(".displayed-class")).toBeHidden();
    // to handlde popup // dialog
    page.on('dialog',dialog=> dialog.accept()) // it help you to listen the events
    await page.locator("#confirmbtn").click();
    // How we can hover to an particular element
    await page.locator("#mousehover").hover();
    await page.locator("a[href='#top']").click();
    // how to handle iframe
    const framePage=  page.frameLocator("#courses-iframe")
    await framePage.locator("li a[href='lifetime-access']:visible").click(); // with visible tag playwright will focus on visible locator only
    const textCehck = await framePage.locator(".text h2").textContent();
    const output = textCehck.split(" ")[1];
    console.log(output);









})



