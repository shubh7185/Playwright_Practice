class AddToCart{


    constructor(page)
    {
        this.page = this.page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cartPage = page.locator("[routerlink='/dashboard/cart']");
        

    }

    async AddProductInCart(productName)
    {
            

            const titles = await this.productsText.allTextContents();
            console.log(titles);
            const count = await this.products.count();
            for(let i=0 ;i<count;i++)
            {
                if(await this.products.nth(i).locator('b').textContent()=== productName)
                {
                    // add to cart
                    await this.products.nth(i).locator("text = Add To Cart").click();
                    break;
                }
        
        
            }


    }


    async NavigateCartPage()
    {
        await this.cartPage.click();
    }

    // async WaitForPageLoad()
    // {
    //     await this.page.locator(".subtotal button.btn-primary").click();
    // } 


}

module.exports = {AddToCart};
