const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./Login")
const Shippingdetails = require("./Shippingdetails")
const Summary = require("./Summary")

class POmanager{
    constructor(page){
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
module.exports=POmanager