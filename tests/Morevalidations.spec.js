const {test,expect}=require("@playwright/test");

test('Popup Validations',async({page})=>{
    await page.goto("https:www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.goto("https://selenium.qabible.in/index.php")
    //Navigating to Alerts and Models -> Javascript Alert
    await page.locator("#alert-modal").click()
    await page.locator(".list-group-item").nth(4).click() // we have multiple elements with the same name
    // Javascript Confirm Box
    page.on('dialog',async dialog=>{
        await page.waitForTimeout(3000) // 3 seconds delay
        await dialog.accept() // clicking on to OK button - accept(). for CANCEL it is dismiss()
    })
    await page.locator(".btn.btn-warning").click()
    await expect(page.locator("#confirm-demo")).toHaveText("You pressed OK!")
    await page.locator("#others").hover() 
    await page.goto('https://demoqa.com/frames')
    const framepage=page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent())
    await page.pause()
})

// screenshot
test('Screenshot',async({page})=>{
    await page.goto("https:www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await page.locator(".error-message-container.error").screenshot({path:'error.png'}) // just the screenshot of the error message container
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.screenshot({path:'error1.png'}) // screenshot of the entire page
    await page.pause()
})

// Visual comparison
test('Visual Comparison',async({page})=>{
    await page.goto("https:www.saucedemo.com")
    expect(await page.screenshot()).toMatchSnapshot("Saucedemo.png")  // comparison // first time it will get error as it is not created

})