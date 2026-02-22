class Checkout{

    constructor(page)
    {
        this.page = page;
        this.cartProduct = page.locator("h3:has-text('ZARA COAT 3')")
        this.CheckoutButton = page.locator(".subtotal button.btn-primary");
    }

    async ClickToCheckout()
    {
        await this.CheckoutButton.click();
    }

}

module.exports = {Checkout};