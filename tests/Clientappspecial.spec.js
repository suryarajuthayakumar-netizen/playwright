const {test,expect}=require("@playwright/test");

test("@web clientapp special Automation",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole("button",{name:'login'}).click()
    await page.waitForLoadState("networkidle")
    await page.locator(".inventory_item_name").first().waitFor()
    const title=await page.locator(".inventory_item_name").allTextContents();
    console.log(title)
    const product=page.locator(".inventory_item")
    const productname='Sauce Labs Backpack'
    const count=await product.count()
    for(let i=0;i<count;i++){
        if(await product.nth(i).locator(".inventory_item_name").textContent()===productname){
            await product.nth(i).locator("text=Add to cart").click()
            break;
        }
    }
    await page.locator("#shopping_cart_container").click()
    await page.locator(".inventory_item_name").waitFor()
    await page.getByRole("button",{name:'Checkout'}).click()
    await page.getByPlaceholder("First Name").fill("Suryaraj")
    await page.getByPlaceholder("Last Name").fill("U")
    await page.getByPlaceholder("Zip/Postal Code").fill("629002")
    await page.getByRole("button",{name:'Continue'}).click()
    await page.locator(".summary_info").waitFor()
    await expect(page.getByText("Item total: $29.99")).toBeTruthy()
    await page.getByRole("button",{name:'finish'}).click()
    await expect(page.getByText("Thank you for your order!")).toBeTruthy()
})