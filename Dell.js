const ExcelJS=require("exceljs")

async function writeExcelFile(){
    const workbook=new ExcelJS.Workbook()
    await workbook.xlsx.readFile("C:/Users/ASUS/Downloads/Obsqura Testing.xlsx")
    const workbook=workbook.getWorksheet("Sheet1")
    
}