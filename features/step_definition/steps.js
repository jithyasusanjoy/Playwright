const { Given, Then, When } = require("@cucumber/cucumber");
const POManager = require("../../pages/POManager");
const { chromium, expect } = require("@playwright/test");



Given('The username {string} and password {string} click on the login button', async function (username,password) {
 //const browser=await chromium.launch({headless:false})
 //const context=await browser.newContext()
 //this.page=await context.newPage()
// const page=await context.newPage()
  //const pomanager=new POManager(page)
  this.pomanager=new POManager(this.page)
  const login=this.pomanager.getLogin()
    await login.goto()
    await login.validlogin(username,password)
});

When('The dashboard is displayed and the product {string} is added to cart and click on the icon to move to mycart',async function (productname) {
  
    const dashboard=this.pomanager.getDashboard()
    await dashboard.selectproduct(productname)
    await dashboard.movetocart()

});

Then('The product details are verified and click on the Checkout button', async function () {
  const cart=this.pomanager.getCart()
    await cart.validateproduct()
    await cart.clickcheckout()
});

When('The shipping details are entered and the continue button is clicked', async  function () {
    const shipping=this.pomanager.getshippingDetails()
    await shipping.enteruserdetails("fname","lname","23523")
    await shipping.clickcontinue()
});

Then('The product summary is displayed',async function () {
 this.summary=this.pomanager.getSummary()
    await this.summary.validatesummary()
});

When('The finish button is clicked',async function () {
  await this.summary.clickfinish()
});

Then('The order is processed and confirmation message- Thank you for your order! is displayed', async function () {
  await expect(this.page.locator(".complete-header")).toHaveText("Thank you for your order!")
});

Given('The wrong username {string} and password {string} and click on the login button', async function (username,password) {
    await this.page.goto("https://www.saucedemo.com/")
    await this.page.locator("#user-name").fill(username)//# added as prefix when using id
    await this.page.locator("#password").fill(password)
    await this.page.locator("#login-button").click()
});

Then('Verify error message is displayed', async function () {
   console.log(await this.page.locator(".error-message-container.error").textContent())//dot added as prefix when using id
    await expect(this.page.locator(".error-message-container.error")).toContainText("Epic sadface")//if classname has space replace it with dot
    
});