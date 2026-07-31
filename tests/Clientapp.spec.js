const {test,expect} = require("@playwright/test"); // CSS locator

test("@web clientapp automation",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standard_user") //# is id
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    await page.waitForLoadState("networkidle")
    await page.locator(".inventory_item_name").first().waitFor()  // .is class name
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
    await page.locator("#checkout").click()
    await page.locator("#first-name").fill("Suryaraj")
    await page.locator("#last-name").fill("U")
    await page.locator("#postal-code").fill("629002")
    await page.locator("#continue").click()
    await page.locator(".summary_info").waitFor()
    await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99");
    await page.locator("#finish").click()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
})
