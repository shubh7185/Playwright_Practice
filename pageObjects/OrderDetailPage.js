const { expect } = require("@playwright/test");
class OrderDetailPage {

    constructor(page) {
        this.page = page;
        this.monthdropdown = page.locator(".input.ddl ").first();
        this.datedropdown = page.locator(".input.ddl ").nth(1);
        this.cardDetails = page.locator("input[value='4542 9931 9292 2293']");
        // this.EnterCVV = page.locator(".field.small input");
        this.EnterName = page.locator(".field input").nth(2);
        this.EnterNumber = page.locator(".field input").nth(3);
        this.countryDropDown = page.locator("[placeholder*='Select Country']");
        this.AutoSuggestionDropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
    }

    async OrderDetails(month, date, cardDetail, Name, PhoneNumber, CountryCode, CountryName) {

        await this.monthdropdown.selectOption(month);
        await this.datedropdown.selectOption(date);
        await this.cardDetails.fill(cardDetail);
        // await this.EnterCVV.fill('123');
        await this.EnterName.fill(Name);
        await this.EnterNumber.fill(PhoneNumber);

        await this.countryDropDown.type(CountryCode, { delay: 100 });
        await this.AutoSuggestionDropdown.waitFor();
        const optionsCount = await this.AutoSuggestionDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.AutoSuggestionDropdown.locator("button").nth(i).textContent();
            if (text.trim() === CountryName) {
                await this.AutoSuggestionDropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async VerifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }



}


module.exports = { OrderDetailPage };