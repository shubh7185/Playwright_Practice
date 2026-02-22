class OrderHistory{

    constructor(page)
    {
        this.page=page;
        this.orderTable = page.locator("tbody");
        this.row = page.locator("tbody tr");
        this.oderDetails = page.locator(".col-text.-main");

    }

    async searchOrderID(orderId)
    {
         await this.orderTable.waitFor();
        
            const TotalRows =  this.row;
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
        
            
    }


    async getOrderId()
    {
        const orderDetails = await this.oderDetails.textContent();
        return orderDetails;

    }
}


module.exports = {OrderHistory};