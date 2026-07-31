const {test,expect} = require("@playwright/test"); // expert is keyword to import the testcases
//test.describe.configure({mode:"parallel"}) // parallel execution
test('first testcase',async function(){ // older method

})

test("browser context playwright text",async({browser})=>{  // newer method
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.google.com")
    console.log(await page.title())
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standarduser")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click();
    await expect(page.locator("h3[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service")
console.log(await page.locator("h3[data-test='error']").textContent())
await expect(page.locator("h3[data-test='error']")).toContainText("Epic sadface")

await page.locator("#user-name").fill("")
await page.locator("#user-name").fill("standard_user")
await page.locator("#login-button").click();
console.log(await page.locator(".inventory_item_name").first().textContent())
console.log(await page.locator(".inventory_item_name").nth(1).textContent())
const carttitle=await page.locator(".inventory_item_name").allTextContents()
console.log(carttitle)
await page.pause()
})



// assertion
test("page context playwright test",async({page})=>{
    await page.goto("https://www.google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google") //to check whether we get the correct page title
})

test("ui controls",async({page})=>{
    await page.goto('https://selenium.qabible.in/index.php')
    await page.locator("//a[normalize-space()='Input Form']").click()
    await page.locator("//a[normalize-space()='Checkbox Demo']").click()
    await page.locator("#gridCheck").check()
    await expect(page.locator("#gridCheck")).toBeChecked()
    expect(await page.locator("#gridCheck").isChecked()).toBeTruthy()
    await page.locator("//a[normalize-space()='Radio Buttons Demo']").click()
    await page.locator("#inlineRadio1").check()
    await expect(page.locator("#inlineRadio1")).toBeChecked()
    await page.locator("#inlineRadio24").check()
    expect(await page.locator("#inlineRadio24").isChecked).toBeTruthy()
    await expect(page.locator("#inlineRadio24")).toBeChecked()
    await page.locator("//a[normalize-space()='Select Input']").click()
    await page.locator("#single-input-field").selectOption("Red")
    await expect(page.locator("#single-input-field")).toHaveValue("Red")
    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Suryaraj")
    await page.locator("#validationCustom02").fill("U")
    await page.locator("#validationCustomUsername").fill("Suryaraj U")
    await page.locator("#validationCustom03").fill("Nagercoil")
    await page.locator("#validationCustom04").fill("Tamilnadu")
    await page.locator("#validationCustom05").fill("629002")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click()
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    await page.locator("//a[normalize-space()='Simple Form Demo']").click()
    await page.locator("#single-input-field").fill("Hello world")
    await page.locator("#button-one").click()
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello world")
    await page.pause()
})

test("child window and new tab handling",async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.google.com")
    const [childpage]=await Promise.all([
        context.waitForEvent('page'),
        page.evaluate(()=>window.open("https://www.github.com"))
    ])
const newtab=await context.newPage()
await newtab.goto("https://www.saucedemo.com")
console.log("child window and new tab opened successfully")
await page.pause()
})

test("special locators",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
 //   await page.locator("//a[normalize-space()='Input Form']").click()
await page.getByRole("link",{name:'Input Form'}).click() 
  //  await page.locator("//a[normalize-space()='Checkbox Demo']").click()
  await page.getByRole("link",{name:'Checkbox Demo'}).click()
    await page.getByLabel("Click on this check box").check()
  //  await page.locator("//a[normalize-space()='Radio Buttons Demo']").click()
  await page.getByRole("link",{name:'Radio Buttons Demo'}).click()
    await page.getByLabel("45 to 60").check()
  //  await page.locator("//a[normalize-space()='Select Input']").click()
    await page.getByRole("link",{name:'Select Input'}).click()
    await page.getByLabel("Select Color").selectOption("Red")
//  await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.getByRole("link",{name:'Form Submit', exact: true}).click()
    await page.getByPlaceholder("First name").fill("Suryaraj")
    await page.getByPlaceholder("Last name").fill("U")
    await page.getByPlaceholder("Username").fill("suryaraj")
    await page.getByPlaceholder("City").fill("Nagercoil")
    await page.getByPlaceholder("State").fill("Tamilnadu")
    await page.getByPlaceholder("Zip").fill("629002")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name:'Submit form'}).click()
    await page.getByRole("link",{name:'Simple Form Demo'}).click()
    await page.getByPlaceholder("Message").fill("hello world")
    await page.getByRole("button",{name:'Show Message'}).click()
    await page.getByText("Your Message : hello world").isVisible()
    await page.pause()
})

//Calender Validation
const date=12
const month=11
//const year=1997
test('Calender Validation',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Date Pickers'}).click()
    await page.getByRole("link",{name:'Bootstrap Date Picker'}).click()
    await page.locator("#single-input-field").click()
    await page.locator(".datepicker-days th.datepicker-switch").click() //th table head
    await page.locator(".datepicker-months th.datepicker-switch").click()
    const targetyear=1997
    while(true){
        const currentdecade=await page.locator(".datepicker-years th.datepicker-switch").textContent()
        const startdecade=parseInt(currentdecade.split("-")[0])
        if(targetyear>=startdecade && targetyear<=startdecade+9)
            break
        await page.locator(".datepicker-years th.prev").click()
    }
    await page.getByText(targetyear.toString(),{exact:true}).click()
    await page.locator(".month").nth(month-1).click()
    await page.getByText(date.toString(),{exact:true}).first().click() //geting the date 12

    
    
    await page.pause()
})






