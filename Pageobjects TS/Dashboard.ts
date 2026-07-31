import { Locator, Page } from "@playwright/test"

export class Dashboard{
    page:Page
    item:Locator
    product:Locator
    cart:Locator
    constructor(page:Page){
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.product=page.locator(".inventory_item")
        this.cart=page.locator("#shopping_cart_container")
    }
    async selectProduct(productname:string){
        await this.page.waitForLoadState("networkidle")
        await this.item.first().waitFor()  // .is class name
        const title=await this.item.allTextContents();
        console.log(title)
        const product=this.product
        //const productname='Sauce Labs Backpack'
        const count=await this.product.count()
        for(let i=0;i<count;i++){
            if(await this.product.nth(i).locator(".inventory_item_name").textContent()===productname){
              await this.product.nth(i).locator("text=Add to cart").click()
              break;
        }
    }
    }
    async moveToCart(){
        await this.cart.click()
    }
}
//module.exports=Dashboard
