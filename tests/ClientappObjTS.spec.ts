import {test,expect} from "@playwright/test";
import { POmanager } from "../Pageobjects TS/POmanager";

const testdata=JSON.parse(JSON.stringify(require('../utils/placeordertestdata.json')))
test("Automation of order processing system using page object model",async({page})=>{
    let pomanager=new POmanager(page)
    let login=pomanager.getLogIn()
    await login.goto()
    await login.validlogin(testdata.username,testdata.password)
    let dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testdata.product)
    await dashboard.moveToCart()
    let cart=pomanager.getCart()
    await cart.checkout()
    let details=pomanager.getShippingDetails()
    await details.enterUserDetails("Suryaraj","U","629002")
    await details.clickContinue()
    let summary=pomanager.getSummary()
    await summary.verifySummary()
    await summary.clickFinish()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
})

/* customtest.only("customized testcase",async({page,testdatafororder})=>{
    let pomanager=new POmanager(page)
    let login=pomanager.getLogIn()
    await login.goto()
    await login.validlogin(testdatafororder.username,testdatafororder.password)
    let dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testdatafororder.product)
    await dashboard.moveToCart()
    let cart=pomanager.getCart()
    await cart.checkout()
}) */