//const { expect } = require("@playwright/test")
import {expect, Locator, Page} from '@playwright/test'


export class Cart
{
    page:Page
    item:Locator
    checkoutbtn:Locator

    constructor(page:Page)
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
//module.exports=Cart