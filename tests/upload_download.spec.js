const ExcelJs = require('exceljs');

const {test, expect} = require('@playwright/test');

async function WriteExcel(searchText,replaceText,change,filePath) {
    const workbook = new ExcelJs.Workbook();
    
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet,searchText);
    
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    console.log(cell.value);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log(cell);
}


async function readExcelFile(worksheet,searchText)
{
        let output = {row:-1,column:-1}
        worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // console.log(cell.value);
            if(cell.value === searchText )
            {
                output.row=rowNumber;
                output.column=colNumber;
            }
        });
    });
    return output;
}

// WriteExcel("Iphone",350,{rowChange:0,colChange:2},"C:\\Users\\Shubh Agrawal\\Downloads\\download.xlsx");

test('upload download excel validation',async({page})=>
{
    const testSearch = 'Apple';
    const updateValue = 360;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await downloadPromise;

    WriteExcel("Apple",360,{rowChange:0,colChange:2},"C:\\Users\\Shubh Agrawal\\Downloads\\download.xlsx");
    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Shubh Agrawal\\Downloads\\download.xlsx"); // It works only when component type == file present
    const textLocator = page.getByText(testSearch);
    const dersiredRow = await page.getByRole('row').filter({has : textLocator});
    await expect(dersiredRow.locator("##cell-4-undefined")).toContainText(updateValue);


})