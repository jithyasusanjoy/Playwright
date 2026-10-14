const Exceljs=require('exceljs')

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
writeexcelfile("/Users/jithyajoy/Downloads/Obsqura Testing.xlsx","Zenaida Frank","San Francisco")