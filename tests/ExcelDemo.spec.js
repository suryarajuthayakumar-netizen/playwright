//Activity
// 1)Download the excel file from selenium site : https://selenium.qabible.in/index.php
// 2) Make the changes as per ExcelDemo.js
// 3) Upload the file in to the site : https://tiiny.host/

const {test,expect}=require("@playwright/test")
const ExcelJS=require("exceljs")

test("Download Excel,Excel Update,Upload Excel",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Table',exact:true}).click()
    await page.getByRole("link",{name:'Table Data Download',exact:true}).click()
    const downloadPromise=page.waitForEvent('download')
    await page.getByRole("button",{name:'Excel'}).click()
    const download=await downloadPromise
    const systemDownloadFolder="C:\\Users\\ASUS\\Downloads\\Obsqura Testing.xlsx"
    await download.saveAs(systemDownloadFolder)
    console.log(`Excel downloaded successfully to: ${systemDownloadFolder}`)
    

async function writeExcelFile(systemDownloadFolder,searchvalue,changevalue,change){
    const workbook=new ExcelJS.Workbook()
    await workbook.xlsx.readFile(systemDownloadFolder)
    const worksheet=workbook.getWorksheet("Sheet1")
    const output=await readExcelFile(worksheet,searchvalue)
    const cell=worksheet.getCell(output.row,output.col+change)
    cell.value=changevalue
    await workbook.xlsx.writeFile(systemDownloadFolder)
}
async function readExcelFile(worksheet,searchvalue){
    let output={row:-1,col:-1}
    worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{
            if(cell.value===searchvalue){
            output.row=rownumber
            output.col=colnumber
           }
        })
    })
    return output
}
writeExcelFile("C:/Users/ASUS/Downloads/Obsqura Testing.xlsx","Bruno Nash","India",2)

await page.goto("https://tiiny.host/")
await page.getByRole('button',{name:'Upload file'}).last().click()
await page.waitForTimeout(3000)
const fileChooserPromise=page.waitForEvent('filechooser')
await page.getByRole('button',{name:'Upload file',exact:true}).click()
const filechooser=await fileChooserPromise
await filechooser.setFiles(systemDownloadFolder)
await page.waitForTimeout(3000)
console.log(`Excel uploaded successfully to: ${systemDownloadFolder}`)
await page.waitForTimeout(3000)
    }
)
