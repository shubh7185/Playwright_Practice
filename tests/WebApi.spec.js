const { test, expect, request } = require("@playwright/test");
const { APIUtills } = require("./Utills/APIUtills.js");

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "696886c0c941646b7a9a3b53" }],
};

let response;
test.beforeAll(" Calling login with API", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtills(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
});

test("Browser context Playwright test with API", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  //await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
