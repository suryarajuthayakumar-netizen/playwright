const ExcelJS=require("exceljs") // importing the dependency

//async function writeExcelFile(){
//async function writeExcelFile(filepath){
async function writeExcelFile(filepath,searchvalue,changevalue,change){
    const workbook=new ExcelJS.Workbook()
    //await workbook.xlsx.readFile("C:/Users/ASUS/Downloads/Obsqura Testing.xlsx")
    await workbook.xlsx.readFile(filepath)
    const worksheet=workbook.getWorksheet("Sheet1")
    //const output=await readExcelFile(worksheet)
    const output=await readExcelFile(worksheet,searchvalue)
  //  const cell=worksheet.getCell(output.row,output.col)
    const cell=worksheet.getCell(output.row,output.col+change)
  //  cell.value='suryaraj'
    //cell.value="Tokyo"
    cell.value=changevalue

    //await workbook.xlsx.writeFile("C:/Users/ASUS/Downloads/Obsqura Testing.xlsx")
    await workbook.xlsx.writeFile(filepath)
}
async function readExcelFile(worksheet,searchvalue){
    let output={row:-1,col:-1}
    worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{
         //  if(cell.value==='Airi Satou'Bruno Nash){
          // if(cell.value==='Bruno Nash'){
            if(cell.value===searchvalue){
            output.row=rownumber
            output.col=colnumber
           }
          // console.log(cell.value)
        })
    })
    return output
}
//writeExcelFile()
writeExcelFile("C:/Users/ASUS/Downloads/Obsqura Testing.xlsx","Bruno Nash","Newyork",2)