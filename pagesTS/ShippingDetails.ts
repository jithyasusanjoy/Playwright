import { Locator, Page } from "@playwright/test"

export class ShipppingDetails
{
    page:Page
    firstname:Locator
    lastname:Locator
    postalcode:Locator
    continuebtn:Locator
    constructor(page:Page)
    {
        this.page=page
        this.firstname=page.locator("#first-name")
        this.lastname=page.locator("#last-name")
        this.postalcode=page.locator("#postal-code")
        this.continuebtn=page.locator("#continue")
    }
    async enteruserdetails(fname:string,lname:string,pin:string)
    {
        await this.firstname.fill(fname)
        await this.lastname.fill(lname)
        await this.postalcode.fill(pin)
    }
    async clickcontinue()
    {
         await this.continuebtn.click()
    }
}
//module.exports=ShipppingDetails