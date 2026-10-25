const {  test,expect } = require("@playwright/test");
const Exceljs=require('exceljs')
const path = require('path')

async function readexcelfile(worksheet,searchvalue)
    {
       let output={row:-1,col:-1}
        worksheet.eachRow((row,rownumber)=>{
            row.eachCell((cell,colnumber)=>{
                //console.log(cell.value)
                if(cell.value===searchvalue)
                {
                    output.row=rownumber
                    output.col=colnumber
                }
            })
        })
        return output
    }

    async function writeexcelfile(filepath,searchvalue,changevalue)
    {
        const workbook= new Exceljs.Workbook()
        await workbook.xlsx.readFile(filepath)
        const worksheet= workbook.getWorksheet('Sheet1')
        const output=await readexcelfile(worksheet,searchvalue)
        const cell=worksheet.getCell(output.row,output.col+2)
        cell.value=changevalue//editable not permanent
        await workbook.xlsx.writeFile(filepath)//permanant writing to excel
    }

test('excel file download upload',async({page},testInfo)=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-item").nth(3).click()
    await page.locator(".list-group-item").nth(3).click()

// Start waiting for the download BEFORE clicking
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:"Excel"}).click()
    const download = await downloadPromise;

    // Save into the test's own output folder (portable, no hard-coded user path)
    const filePath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(filePath);
      
    await writeexcelfile(filePath,"Zenaida Frank","San Francisco")

    // Upload the changed file
    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.locator("#file-upload").setInputFiles(filePath)
    await page.getByRole("button", { name: "Upload" }).click()

    // Verify the upload worked
    await expect(page.getByRole("heading", { name: "File Uploaded!" })).toBeVisible()
    await expect(page.locator("#uploaded-files")).toHaveText(path.basename(filePath))
    await page.pause()
})
   
