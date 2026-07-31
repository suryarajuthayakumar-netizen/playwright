import { Page } from "@playwright/test"
import { Cart } from "./Cart"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import { Shippingdetails } from "./Shippingdetails"
import { Summary } from "./Summary"

/* const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./Login")
const Shippingdetails = require("./Shippingdetails")
const Summary = require("./Summary") */

export class POmanager{
    page:Page
    cart:Cart
    dashboard:Dashboard
    login:Login
    shippingdetails:Shippingdetails
    summary:Summary
    constructor(page:Page){
        this.page=page
        this.cart=new Cart(page)
        this.dashboard=new Dashboard(page)
        this.login=new Login(page)
        this.shippingdetails=new Shippingdetails(page)
        this.summary=new Summary(page)
    }
    getLogIn(){
        return this.login
    }
    getCart(){
        return this.cart
    }
    getDashboard(){
        return this.dashboard
    }
    getShippingDetails(){
        return this.shippingdetails
    }
    getSummary(){
        return this.summary
    }
}
//module.exports=POmanager