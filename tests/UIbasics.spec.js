const {test,expect}= require("@playwright/test")
test.describe.configure({mode:'parallel'})

test('first playwright test',async function()
{

})

test('browser context playwright test',async({browser})=> //browser context
{
    const context=await browser.newContext() //context object creation
    const page = await context.newPage() // page object creation
    await page.goto("https://google.com")
    console.log(await page.title()) // printing page title
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standarduser")//# added as prefix when using id
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    console.log(await page.locator(".error-message-container.error").textContent())//dot added as prefix when using id
    await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface")//if classname has space replace it with dot
    await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    const username= page.locator("#user-name")
    const login =page.locator("#login-button")
    const  cardtitle = page.locator(".inventory_item_name ")
    await username.fill(" ")
    await username.fill("standard_user")
    await login.click()
    console.log(await cardtitle.first().textContent())// print first element
    console.log(await cardtitle.nth(1).textContent()) // print 2nd element
    console.log(await cardtitle.allTextContents())
    //await page.pause()//temporary pause to check browser page
}
)

test('page context playwright test',async({page})=> //page context
{
await page.goto("https://google.com")
console.log(await page.title())
await expect(page).toHaveTitle("Google")//Assertions
}
)

test('UI Controlls',async({page})=>{
await page.goto("https://selenium.qabible.in/index.php")
//checkbox
await page.locator(".nav-item").nth(1).click()
await page.locator(".list-group-item").nth(1).click()
await page.locator("#gridCheck").check()
await expect(page.locator("#gridCheck")).toBeChecked()
expect(await page.locator("#gridCheck")).toBeTruthy()
//radiobutton
await page.locator(".list-group-item").nth(2).click()
await page.locator("#inlineRadio1").check()
await expect(page.locator("#inlineRadio1")).toBeChecked()
expect(await page.locator("#inlineRadio1")).toBeTruthy()
await page.locator("#inlineRadio24").check()
expect(await page.locator("#inlineRadio24").isChecked).toBeTruthy()

//dropdown
await page.locator("//a[normalize-space()='Select Input']").click() // relative xpath using selectorshub
await page.locator("#single-input-field").selectOption("Yellow")
expect(await page.locator("#single-input-field")).toHaveValue("Yellow")

//text fields
await page.locator("//a[normalize-space()='Form Submit']").click()
await page.locator("#validationCustom01").fill("Jithya")
await page.locator("#validationCustom02").fill("Joy")
await page.locator("#validationCustomUsername").fill("jithya")
await page.locator("#validationCustom03").fill("kollam")
await page.locator("#validationCustom04").fill("Kerala")
await page.locator("#validationCustom05").fill("691503")
await page.locator("#invalidCheck").check()
await page.locator(".btn.btn-primary").click()
await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")

//simple form
await page.locator(".list-group-item").nth(0).click()
await page.locator("#single-input-field").fill("Hello world")
await page.locator("#button-one").click()
await expect(page.locator("#message-one")).toHaveText("Your Message : Hello world")

})

test('Child window new tab',async({browser})=>{
const context= await browser.newContext()
const page = await context.newPage()
await page.goto("https://www.google.com")
const [newpage]= await Promise.all([ // 1st method to create new tab
    context.waitForEvent('page'),
    page.evaluate(()=>window.open("https://www.github.com"))
])
const newTab=await context.newPage()// 2nd method to create new tab
await newTab.goto("https://www.saucedemo.com/")
//await page.pause()
})

const date=12
const month=11
const year=1997
test('Calendar validation',async({page})=>{
await page.goto("https://selenium.qabible.in/index.php")
await page.locator(".nav-item").nth(2).click()
await page.locator(".list-group-item").nth(0).click()
await page.locator("#single-input-field").click()
await page.locator(".datepicker-days th.datepicker-switch").click()
await page.locator(".datepicker-months th.datepicker-switch").click()
const targetyear=1997
while(true)
{
    const currentdecade=await page.locator(".datepicker-years th.datepicker-switch ").textContent()
    const startdecade=parseInt(currentdecade.split("-")[0])
    if(targetyear>=startdecade && targetyear<=startdecade+9)
    {
      break
    }
    if(targetyear<startdecade)
    {
        await page.locator(".datepicker-years th.prev").click()

    }
    else
    {
        await page.locator(".datepicker-years th.next").click()
    }
}
await page.getByText(targetyear.toString(),{exact:true}).click()
await page.locator(".month").nth(month-1).click()
await page.getByText(date.toString(),{exact:true}).click()




})

//codegen code

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('jith');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('joy');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('70567');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  //await page.pause()
});

//special locators
test('Special locators',async({page})=>{
await page.goto("https://selenium.qabible.in/index.php")
//await page.locator(".nav-item").nth(1).click()
await page.getByRole("link",{name:'Input Form'}).click()
//await page.locator(".list-group-item").nth(1).click()
await page.getByRole("link",{name:'Checkbox Demo'}).click()
await page.getByLabel("Click on this check box").check()
//await page.locator(".list-group-item").nth(2).click()
await page.getByRole("link",{name:'Radio Buttons Demo'}).click()
await page.getByLabel("45 to 60").check()
//await page.locator("//a[normalize-space()='Select Input']").click()
await page.getByRole("link",{name:'Select Input'}).click()
await page.getByLabel("Select Color").selectOption("Green")
//await page.locator("//a[normalize-space()='Form Submit']").click()
await page.getByRole("link",{name:'Form Submit', exact: true}).click()
await page.getByPlaceholder("First name").fill("jithya")
await page.getByPlaceholder("Last name").fill("joy")
await page.getByPlaceholder("Username").fill("jit")
await page.getByPlaceholder("City").fill("kollam")
await page.getByPlaceholder("State").fill("kerala")
await page.getByPlaceholder("Zip").fill("3455")
await page.getByLabel("Agree to terms and conditions").check()
await page.getByRole("button",{name:'Submit form'}).click()
await expect(page.getByText("Form has been submitted successfully!")).toBeVisible()
await page.getByRole("link",{name:'Simple Form Demo'}).click()
await page.getByPlaceholder("Message").fill("Hello")
await page.getByRole("button",{name:'Show Message'}).click()
await expect(page.getByText("Your Message : Hello")).toBeVisible()
//await page.pause()
})