const {test, expect} = require('@playwright/test');
// const {loginPage} = require('../pageObjects/loginPage');
// const {AddToCart} = require('../pageObjects/AddToCart');
// const { Checkout } = require('../pageObjects/Checkout');
// const { OrderDetailPage } = require('../pageObjects/OrderDetailPage');
const {POManager} = require('../pageObjects/POManager');


test.only('Browser context Playwright test', async ({page}) => { 
    const poManager = new POManager(page);
   const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin("anshika@gmail.com","Iamking@000");

    await loginpage.WaitForLoadPage();

    const addToCart = poManager.getCartPage();
    await addToCart.AddProductInCart(productName);
    await addToCart.NavigateCartPage();
    

    // await page.locator("[routerlink='/dashboard/cart']").click();
    const checkoutPage = poManager.getCheckOutPage();
    await page.locator("div li").first().waitFor();
    const bool = await checkoutPage.cartProduct.isVisible();
    expect(bool).toBeTruthy();

    await checkoutPage.ClickToCheckout();

    const orderdetails  = poManager.getOrderPage();
    await orderdetails.OrderDetails("08","02","4111111111111111","Shubh agrawal","12345678","Ind","India");
    await orderdetails.VerifyEmailId("anshika@gmail.com");

    const orderId = await orderdetails.SubmitAndGetOrderId();
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
    expect(orderId.includes(orderDetails)).toBeTruthy();


 
});
