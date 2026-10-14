const {  test,expect } = require("@playwright/test");

test('@web client app to automate shopping cart application',async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    await page.waitForLoadState('networkidle')
    await page.locator(".inventory_item_name ").first().waitFor()
    console.log(await page.locator(".inventory_item_name ").allTextContents())
    const products=page.locator(".inventory_item_name")
    const productname ="Sauce Labs Backpack"
    const count=await products.count()
    console.log(count)
    for(let i=0;i<count;i++)
    {
        if(await products.nth(i).textContent()===productname)
        {
            await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
            break
        }
    }
    await page.locator("#shopping_cart_container").click()
    await expect(page.locator(".inventory_item_name").filter({ hasText: "Sauce Labs Backpack" })).toBeVisible();
    await page.locator("#checkout").click()
    await page.locator("#first-name").fill("Jithya")
    await page.locator("#last-name").fill("Joy")
    await page.locator("#postal-code").fill("5345543")
    await page.locator("#continue").click()
    await page.locator(".inventory_item_name").waitFor()
    await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
    await page.locator("#finish").click()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
   // await page.pause()
})