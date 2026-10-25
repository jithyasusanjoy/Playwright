const { Before, After, Status, AfterStep } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

Before(async function() {
    console.log("I am first")
    const browser=await chromium.launch({headless:false})
     const context=await browser.newContext()
     this.page=await context.newPage()
})
After(async function() {
    console.log("I am last")
})
AfterStep(async function(result) {
    if(result.status===Status.FAILED)
    {
        const buffer=await this.page.screenshot()
        await this.page.screenshot({path:'screenshot.png'})
        this.attach(buffer.toString('base64'),'base64:image/png')
        console.log("Screenshot logged")
    }
})