const express = require('express');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');

//load environmental file
require('dotenv').config({path:"./config/keys.env"})
//const productModel = require("./model/products");

const app=express();
app.engine("handlebars",exphbs());
app.set('view engine','handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
//load controller
const generalController=require("./controllers/general");
const productController=require("./controllers/product");
app.use("/",generalController);
app.use("/",productController);

/*port for herocu*/
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("connection established !");
});