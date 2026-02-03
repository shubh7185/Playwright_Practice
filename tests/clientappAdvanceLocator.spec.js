const {test, expect} = require('@playwright/test');

// test('First Playwright test', async function(){
//     // /await will get activated only when we mark function async only id didn't mark then there is no use 

// });
// using anyonmus function
test.only('Browser context Playwright test', async ({page}) => { 
   const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com")
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:'Login'}).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();


   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click(); // we use this listitem beacuse it is placed inside the li tag

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();

    // const monthdropdown = page.locator(".input.ddl ").first();
    // await monthdropdown.selectOption("08");
    // const datedropdown = page.locator(".input.ddl ").nth(1);
    // await datedropdown.selectOption("02");
    // await page.locator("input[value='4542 9931 9292 2293']").fill('4111111111111111');
    // await page.locator(".field.small input").first().fill('123');
    // await page.locator(".field input").nth(2).fill("Shubh agrawal");
    // await page.locator(".field input").nth(3).fill("12345678");

    await page.getByPlaceholder("Select Country").pressSequentially("Ind"); // it is use when we want to press keys one by one


    await  page.getByRole("button",{name:"India"}).nth(1).click();


    await page.getByText("Place Order").click();


    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    
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
