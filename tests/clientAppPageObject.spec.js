const {test, expect} = require('@playwright/test');

// const {loginPage} = require('../pageObjects/loginPage');
// const {AddToCart} = require('../pageObjects/AddToCart');
// const { Checkout } = require('../pageObjects/Checkout');
// const { OrderDetailPage } = require('../pageObjects/OrderDetailPage');
const {POManager} = require('../pageObjects/POManager');
const { AddToCart } = require('../pageObjects/AddToCart');


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


    await addToCart.NaivgateOrderPage();

    const orderhistory = poManager.getOrderHistory();
    await orderhistory.searchOrderID(orderId);

    const orderpagedetails = await orderhistory.getOrderId();

    console.log(orderpagedetails);
    console.log(orderId);

    
    expect(orderId.includes(orderpagedetails)).toBeTruthy();
 
});
