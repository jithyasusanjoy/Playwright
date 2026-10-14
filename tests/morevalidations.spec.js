const { expect,test } = require("@playwright/test");

test('popup validations',async({page})=>
{
await page.goto("https://www.saucedemo.com/")
await expect(page.locator("error-message-container.error")).toBeHidden()
await page.locator("#login-button").click()
await expect(page.locator(".error-message-container.error")).toBeVisible()
await page.goto("https://selenium.qabible.in/index.php")
await page.getByRole("link",{name:'Alerts and Modals'}).click()
await page.getByRole("link",{name:'Javascript Alert'}).click()
page.on('dialog',async dialog=>{
    await page.waitForTimeout(3000)
    await dialog.accept()
})
await page.locator(".btn.btn-warning").click()

//hover
await page.getByRole("link",{name:'Others'}).hover()
await page.goto("https://demoqa.com/frames")
const framepage=page.frameLocator("#frame1")
console.log(await framepage.locator("#sampleHeading").textContent())
//await page.pause()
})

//screenshot
test('screenshot',async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await page.locator(".error-message-container.error").screenshot({path:'error.png'})// error message screenshot
    await expect(page.locator(".error-message-container.error"))
    await page.screenshot({path:'error1.png'})//page screenshot
   // await page.pause()
})

//visual comparison -comparing screenshot
test('visual comparison',async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    expect(await page.screenshot()).toMatchSnapshot("saucedemo.png")
    
})