const {test, expect,request} = require('@playwright/test');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let Token;
test.beforeAll(" Calling login with API",async ()=>
{

    const apiContext = await request.newContext();
    const loginRespone = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayLoad
        }
        
    )

    expect(loginRespone.ok()).toBeTruthy();

    const loginResponseJson = await loginRespone.json();
    Token = loginResponseJson.token;
    console.log(Token);

});





test('Browser context Playwright test with API', async ({page}) => { 


await page.addInitScript(value =>
{
    window.localStorage.setItem('token',value);
},Token );

   const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.waitForLoadState('networkidle');


    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0 ;i<count;i++)
    {
        if(await products.nth(i).locator('b').textContent()=== productName)
        {
            // add to cart

            await products.nth(i).locator("text = Add To Cart").click();
        }


    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator(".subtotal button.btn-primary").click();
    const monthdropdown = page.locator(".input.ddl ").first();
    await monthdropdown.selectOption("08");
    const datedropdown = page.locator(".input.ddl ").nth(1);
    await datedropdown.selectOption("02");
    await page.locator("input[value='4542 9931 9292 2293']").fill('4111111111111111');
    await page.locator(".field.small input").first().fill('123');
    await page.locator(".field input").nth(2).fill("Shubh agrawal");
    await page.locator(".field input").nth(3).fill("12345678");
    await page.locator("[placeholder*='Select Country']").pressSequentially("Ind"); // it is use when we want to press keys one by one
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const  optionsCount = await dropdown.locator("button").count();

    console.log(optionsCount);
    for(let i=0;i<optionsCount;i++)
    {
        const text =  await dropdown.locator("button").nth(i).textContent() ;
        if(text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;

            }    
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");

    await page.locator(".btnn").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const countOrders = await page.locator(".em-spacer-1 .ng-star-inserted").count();
    console.log(countOrders);
    // for(let i=0;i<countOrders;i++)
    // {
    //     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").nth(i).textContent();
    //     console.log(orderId);
        
    // }

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("li [routerlink*='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const TotalRows =  page.locator("tbody tr");
    const countTotalRows =  await TotalRows.count();

    console.log(countTotalRows);


    for(let i=0;i<countTotalRows;i++)
    {
        const rowOrderId = await TotalRows.nth(i).locator("th").textContent();
        console.log(rowOrderId);
        if(orderId.includes(rowOrderId))
        {
            await TotalRows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails = await page.locator(".col-text.-main").textContent();
    // await expect(page.locator(".col-text.-main")).toHaveText(orderId);
    expect(orderId.includes(orderDetails)).toBeTruthy();


    // await page.pause();

 
});