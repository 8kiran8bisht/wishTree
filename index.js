const express = require('express');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload=require("express-fileupload");
const session=require("express-session");
const moment = require('moment');
//load environmental file
require('dotenv').config({path:"./config/keys.env"})
//const productModel = require("./model/products");

const app=express();
app.engine("handlebars",exphbs(
    {
        helpers:{
            if_eq:function(val,a){
                if(val==a){
                    return 'selected' ;
                }
                else
                {
                    return '';
                }
                
            },
            if_clerk:function(val){
                if(val=='clerk'){
                    return `<li><a href="/product">Dashboard</a></li>` ;
                }
                else{
                    return '<li><a href="/shoppingCart">Shopping Cart</a></li>'
                }
            }
        }
    }
));
app.set('view engine','handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
//load controller
const generalController=require("./controllers/general");
const productController=require("./controllers/product");
app.use((req,res,next)=>{
    if(req.query.method=='PUT')
    {
        req.method="PUT";
    }
    else if(req.query.method=='DELETE')
    {
        req.method="DELETE";
    }
    next();
})
app.use(fileUpload());

app.use(session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true
  }))

app.use((req,res,next)=>{
    res.locals.currentSession=req.session.login;
    next();
})
app.use("/",generalController);
app.use("/",productController);

/*Connect to mongoDB */
mongoose.connect(process.env.mongo_db_url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to the mogoDB !");
})
.catch((err)=>{
    console.log(`ERROR : Connection Failed${err}`);
})
/*port for herocu*/
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("connection established !");
});