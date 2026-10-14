class ShipppingDetails
{
    constructor(page)
    {
        this.page=page
        this.firstname=page.locator("#first-name")
        this.lastname=page.locator("#last-name")
        this.postalcode=page.locator("#postal-code")
        this.continuebtn=page.locator("#continue")
    }
    async enteruserdetails(fname,lname,pin)
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
module.exports=ShipppingDetails