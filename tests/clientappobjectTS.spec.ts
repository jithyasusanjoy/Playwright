import test, { expect } from "@playwright/test";
import { POManager } from "../pagesTS/POManager";
import { customTest } from "../utilsTS/testbase";


/*const {  test,expect } = require("@playwright/test");
const Login = require("../pages/login");
const Dashboard = require("../pages/Dashboard");
const Cart = require("../pages/Cart");
const ShipppingDetails = require("../pages/ShippingDetails");
const Summary = require("../pages/Summary");
const POManager = require("../pages/POManager");
const { customTest } = require("../utils/TestBase");*/
const testdata=JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")))

for(const data of testdata)
{
test(`automation of shopping cart application in POM for ${data.productname}`,async({page})=>{
   /* const username="standard_user"
    const password="secret_sauce"
    const productname="Sauce Labs Backpack"*/
    const pomanager=new POManager(page)
    
    
    //const login=new Login(page)
    const login=pomanager.getLogin()
    await login.goto()
    await login.validlogin(data.username,data.password)

   // const dashboard= new Dashboard(page)
   const dashboard=pomanager.getDashboard()
    await dashboard.selectproduct(data.productname)
    await dashboard.movetocart()

    //const cart=new Cart(page)
     const cart=pomanager.getCart()
    await cart.validateproduct()
    await cart.clickcheckout()

    //const shipping= new ShipppingDetails(page)
     const shipping=pomanager.getshippingDetails()
    shipping.enteruserdetails("fname","lname","23523")
    shipping.clickcontinue()

    //const summary= new Summary(page)
     const summary=pomanager.getSummary()
    summary.validatesummary()
    summary.clickfinish()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    //await page.pause()
})
}
customTest('customized testcase',async({page,testDataForOrder})=>
{
     const pomanager=new POManager(page)
    
    const login=pomanager.getLogin()
    await login.goto()
    await login.validlogin(testDataForOrder.username,testDataForOrder.password)

   
    const dashboard=pomanager.getDashboard()
    await dashboard.selectproduct(testDataForOrder.productname)
    await dashboard.movetocart()

    
     const cart=pomanager.getCart()
    await cart.validateproduct()
    await cart.clickcheckout()
    //await page.pause()
})