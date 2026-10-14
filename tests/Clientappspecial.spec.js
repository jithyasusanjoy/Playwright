const {  test,expect } = require("@playwright/test");

test('@web client app with special locators',async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole("button",{name:'Login'}).click() 
    await page.waitForLoadState('networkidle')
    await page.getByText("Sauce Labs Backpack").waitFor()
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
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible()
    await page.getByRole("button",{name:'Checkout'}).click()
    await page.getByPlaceholder("First name").fill("jithya")
    await page.getByPlaceholder("Last name").fill("joy")
    await page.getByPlaceholder("Zip/Postal Code").fill("23412")
    await page.getByRole("button",{name:'Continue'}).click()
    await page.getByText("Sauce Labs Backpack").waitFor()
    await expect(page.getByText("Item total: $29.99")).toBeVisible()
    await page.getByRole("button",{name:'Finish'}).click()
    await expect(page.getByText("Thank you for your order")).toBeVisible()
    //await page.pause()
})