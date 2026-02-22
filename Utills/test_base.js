const base = require('@playwright/test');


exports.Customtest = base.test.extend(
{
    testDataForOrder :     {
        username: "anshika@gmail.com",
        passwrod: "Iamking@000",
        productName: "ZARA COAT 3"
    }
}


)