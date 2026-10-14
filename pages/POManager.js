const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./login")
const ShipppingDetails = require("./ShippingDetails")
const Summary = require("./Summary")

class POManager
{
    constructor(page)
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
module.exports=POManager