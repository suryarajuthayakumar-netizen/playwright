class Summary{
    constructor(page){
        this.page=page
        this.summaryinfo=page.locator(".summary_info")
        this.subtotal=page.locator(".summary_subtotal_label")
        this.finishbtn=page.locator("#finish")
    }
    async verifySummary(){
        await this.summaryinfo.waitFor()
        console.log(await this.subtotal.textContent())
        //await expect(this.subtotal).toHaveText("Item total: $29.99");
    }
    async clickFinish(){
        await this.finishbtn.click()
    }
}
module.exports=Summary