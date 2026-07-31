const {test,expect} = require("@playwright/test");
/* const Login = require("../Pageobjects/Login");
const Dashboard = require("../Pageobjects/Dashboard");
const Cart = require("../Pageobjects/Cart");
const Shippingdetails = require("../Pageobjects/Shippingdetails");
const Summary = require("../Pageobjects/Summary"); */
const POmanager = require("../Pageobjects/POManager");
const { customtest } = require("../utils/testbase");

//JSON file stores the hard coded values like username,password,product
const testdata=JSON.parse(JSON.stringify(require('../utils/placeordertestdata.json'))) //importing the JSON file here
test("Automation of order processing system using page object model",async({page})=>{
    let pomanager=new POmanager(page)
    //let login=new Login(page)
    let login=pomanager.getLogIn()
    await login.goto()
    await login.validlogin(testdata.username,testdata.password)
    //await login.validlogin("standard_user","secret_sauce")
    //let dashboard=new Dashboard(page)
    let dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testdata.product)
    //await dashboard.selectProduct('Sauce Labs Backpack')
    await dashboard.moveToCart()
    //let cart=new Cart(page)
    let cart=pomanager.getCart()
    await cart.checkout()
    //let details=new Shippingdetails(page)
    let details=pomanager.getShippingDetails()
    await details.enterUserDetails("Suryaraj","U","629002")
    await details.clickContinue()
    //let summary=new Summary(page)
    let summary=pomanager.getSummary()
    await summary.verifySummary()
    await summary.clickFinish()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
})

customtest("customized testcase",async({page,testdatafororder})=>{
    let pomanager=new POmanager(page)
    let login=pomanager.getLogIn()
    await login.goto()
    await login.validlogin(testdatafororder.username,testdatafororder.password)
    let dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testdatafororder.product)
    await dashboard.moveToCart()
    let cart=pomanager.getCart()
    await cart.checkout()
})