const { expect } = require("@playwright/test")

class Cart
{
    constructor(page)
    {
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.checkoutbtn=page.locator("#checkout")
    }
    async validateproduct()
    { 
        await expect(this.item.filter({ hasText: "Sauce Labs Backpack" })).toBeVisible();    
    }
    async clickcheckout()
    {
        await this.checkoutbtn.click()
    }

}
module.exports=Cart