const {loginPage} = require('./loginPage');
const {AddToCart} = require('./AddToCart');
const { Checkout } = require('./Checkout');
const { OrderDetailPage } = require('./OrderDetailPage');


class POManager{
    constructor(page)
    {
         this.page=page;
         this.loginpage = new loginPage(page);
         this.addToCart = new AddToCart(page);
         this.checkoutPage = new Checkout(page);
         this.orderdetails  = new OrderDetailPage(page);
    }


    getLoginPage()
    {
        return this.loginpage;
    }

    getCartPage()
    {
        return this.addToCart;
    }

    getCheckOutPage()
    {
        return this.checkoutPage;
    }

    getOrderPage()
    {
        return this.orderdetails;
    }
}

module.exports = {POManager};