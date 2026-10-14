import { Locator, Page } from "@playwright/test"

export class Dashboard
{ 
    page:Page
    products:Locator
    item:Locator
    cart:Locator

    constructor(page:Page)
    {
        this.page=page
        this.products=page.locator(".inventory_item_name ")
        this.item=page.locator(".inventory_item")
        this.cart=page.locator("#shopping_cart_container")
    }
    async selectproduct(productname:string)
    {
        await this.page.waitForLoadState('networkidle')
        await this.products.first().waitFor()
        console.log(await this.products.allTextContents())
        //const products=page.locator(".inventory_item_name")
        //const productname ="Sauce Labs Backpack"
        const count=await this.products.count()
        console.log(count)
         for(let i=0;i<count;i++)
            {
            if(await this.products.nth(i).textContent()===productname)
            {
            await this.item.nth(i).locator("text=Add to cart").click()
            break
            }
     }
    }
    async movetocart()
        {
        await this.cart.click()
        }
}
//module.exports=Dashboard