const { test, expect, request } = require("@playwright/test");
const { APIUtills } = require("./Utills/APIUtills.js");

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "696886c0c941646b7a9a3b53" }],
};
const fakePayLoadOrders = {message:"No Product in Cart"};

let response;
test.beforeAll(" Calling login with API", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtills(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
});


test(' Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
 
 
});