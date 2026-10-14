import { Locator, Page } from "@playwright/test"

//const { expect } = require("@playwright/test")

export class Summary
{
    page:Page
    item:Locator
    total:Locator
    finishbtn:Locator
    constructor(page:Page)//page
    {
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.total=page.locator(".summary_subtotal_label")
        this.finishbtn=page.locator("#finish")

    }
    async validatesummary()
    {
        await this.item.waitFor()
      //  await expect(this.total).toHaveText("Item total: $29.99")
        console.log(await this.total.textContent())
    }
    async clickfinish()
    {
        await this.finishbtn.click()
    }
}
//module.exports=Summary