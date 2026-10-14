import { Page } from "@playwright/test"
import { Login } from "./Login"
import { Dashboard } from "./Dashboard"
import { Cart } from "./Cart"
import { ShipppingDetails } from "./ShippingDetails"
import { Summary } from "./Summary"

/*const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./login")
const ShipppingDetails = require("./ShippingDetails")
const Summary = require("./Summary")*/

export class POManager
{
    page:Page
    login:Login
    dashboard:Dashboard
    cart:Cart
    shipping:ShipppingDetails
    summary:Summary
    constructor(page:Page)
    {
    this.page=page
    this.login=new Login(page)
    this.dashboard= new Dashboard(page)
    this.cart= new Cart(page)
    this.shipping= new ShipppingDetails(page)
    this.summary= new Summary(page)
    }
   getLogin()
        {
            return this.login
        }

        getDashboard()
        {
            return this.dashboard
        }
    getCart()
        {
            return this.cart
        }
        getshippingDetails()
        {
            return this.shipping
        }
        getSummary()
        {
            return this.summary
        }
}
//module.exports=POManager