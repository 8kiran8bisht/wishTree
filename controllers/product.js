const express = require('express')
const router = express.Router();
const productModel = require("../model/products");
const nav=`<div class="left">
<section class="navLeft">
       <nav class="left-main-nav">
       <ul class="left-main-nav-ul">
           <li>
               <div><a href="/product/electronics" style="text-decoration: none;">Electronics</a></div>
           </li>
           <li>
               <div><a href="/product/babyCare" style="text-decoration: none;">Baby Care</a></div>
           </li>
           <li>
               <div><a href="/product/shoes" style="text-decoration: none;">Shoes</a></div>
           </li>
           <li>
               <div><a href="/product/valentine" style="text-decoration: none;">Valentine's Day</a></div>
           </li>
           <li>
               <div><a href="/product/bestSeller" style="text-decoration: none;">Best Seller</a></div>
           </li>
           <li>
               <div><a href="/product/onPromotion" style="text-decoration: none;">On Promotion</a></div>
           </li>
          
       </ul>
   </nav>
   </section>
   </div>`;
router.get("/product/products",(req,res)=>{
    res.render('product/products',{
        title:"Products",
        css:"../css/style.css",
        products:productModel.getAllProducts(),
        nav:nav
       
    });
});

router.get("/product/babyCare",(req,res)=>{
    res.render('product/babyCare',{
        title:"babyCare",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getAllbabyCare()
       
    });
});
router.get("/product/shoes",(req,res)=>{
    res.render('product/shoes',{
        title:"shoes",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getAllShoes()
       
    });
});
router.get("/product/onPromotion",(req,res)=>{
    res.render('product/onPromotion',{
        title:"onPromotion",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getAllPromotion()
       
    });
});
router.get("/product/bestSeller",(req,res)=>{
    res.render('product/bestSeller',{
        title:"bestSeller",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getBestSeller()
       
    });
});
router.get("/product/valentine",(req,res)=>{
    res.render('product/valentine',{
        title:"valentine",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getAllVday()
       
    });
});
router.get("/product/electronics",(req,res)=>{
    res.render('product/electronics',{
        title:"electronics",
        css:"../css/style.css",
        nav:nav,
        products:productModel.getAllElectronics()
       
    });
});
module.exports=router;