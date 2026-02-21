class AddToCart{


    constructor(page)
    {
        this.page = this.page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cartPage = page.locator("[routerlink='/dashboard/cart']");

    }
}
