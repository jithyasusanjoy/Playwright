import { Locator, Page } from "@playwright/test"

export class Login
{
    page:Page
    username:Locator
    password:Locator
    loginbtn:Locator
    constructor(page:Page)
    {
        this.page=page
        this.username= page.locator("#user-name")
        this.password= page.locator("#password")
        this.loginbtn= page.locator("#login-button")
    }
    async goto()
    {
        await this.page.goto("https://www.saucedemo.com/")
    }
    async validlogin(username:string,password:string)
    {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginbtn.click()
    }
}
//module.exports=Login