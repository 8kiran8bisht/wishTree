const express = require('express');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const productModel = require("./model/products");

const app=express();
app.engine("handlebars",exphbs());
app.set('view engine','handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

const nav=`<div class="left">
<section class="navLeft">
       <nav class="left-main-nav">
       <ul class="left-main-nav-ul">
           <li>
               <div><a href="/electronics" style="text-decoration: none;">Electronics</a></div>
           </li>
           <li>
               <div><a href="/babyCare" style="text-decoration: none;">Baby Care</a></div>
           </li>
           <li>
               <div><a href="/shoes" style="text-decoration: none;">Shoes</a></div>
           </li>
           <li>
               <div><a href="/valentine" style="text-decoration: none;">Valentine's Day</a></div>
           </li>
           <li>
               <div><a href="/bestSeller" style="text-decoration: none;">Best Seller</a></div>
           </li>
           <li>
               <div><a href="/onPromotion" style="text-decoration: none;">On Promotion</a></div>
           </li>
          
       </ul>
   </nav>
   </section>
   </div>`;
app.get("/",(req,res)=>{
    res.render('home',{
        title:"Home",
        products:productModel.getAllProducts(),
        promotion:productModel.getAllPromotion(),
        bestSeller:productModel.getBestSeller()

    });
});


app.get("/products",(req,res)=>{
    res.render('products',{
        title:"Products",
        products:productModel.getAllProducts(),
        nav:nav
       
    });
});

app.get("/babyCare",(req,res)=>{
    res.render('babyCare',{
        title:"babyCare",
        nav:nav,
        products:productModel.getAllbabyCare()
       
    });
});
app.get("/shoes",(req,res)=>{
    res.render('shoes',{
        title:"shoes",
        nav:nav,
        products:productModel.getAllShoes()
       
    });
});
app.get("/onPromotion",(req,res)=>{
    res.render('onPromotion',{
        title:"onPromotion",
        nav:nav,
        products:productModel.getAllPromotion()
       
    });
});
app.get("/bestSeller",(req,res)=>{
    res.render('bestSeller',{
        title:"bestSeller",
        nav:nav,
        products:productModel.getBestSeller()
       
    });
});
app.get("/valentine",(req,res)=>{
    res.render('valentine',{
        title:"valentine",
        nav:nav,
        products:productModel.getAllVday()
       
    });
});
app.get("/electronics",(req,res)=>{
    res.render('electronics',{
        title:"electronics",
        nav:nav,
        products:productModel.getAllElectronics()
       
    });
});

app.get("/signIn",(req,res)=>{
    res.render('signIn',{
        title:"signIn"
    });
});
app.post("/signIn",(req,res)=>{
    let count=0;
    let userId="";
    if(req.body.userId=="") {
        count++;
        e_userId="*  enter your userId !";
   }
   if(count>0)
   {
       res.render('signIn',{
           title:"SignIn",
          e_userId:e_userId,

    });
}
});
app.get("/contactus",(req,res)=>{
    res.render('contactus',{
        title:"Contact Us",
        body:"hi this is Kiran Bisht!"
    });
});



app.post("/contactus",(req,res)=>{
        let count=0;
        let fNmae="";
        let lName="";
        let eAddr="";
        let pNo="";
        let epassword="";
        let e1password="";
        let message="";
     
        if(req.body.firstName=="") {
             count++;
             fNmae="*  enter your first name !";
        }
        if(req.body.lastName=="") {
            count++;
            lName="*  enter your Last name !";
       }
       if(req.body.email=="") {
        count++;
        eAddr="* enter your Email address !";
      }
      if(req.body.password==""){
        count++;
        epassword="* Enter your Password !";
      }
      else if(req.body.r_password==""){
        count++;
        e1password="* Re-enter your Password !";
      }
      else if(req.body.r_password!=req.body.password){
        e1password="* Password didn't match !";
      }
      else{}
     
      if(req.body.phoneno=="") {
        count++;
        pNo="* enter your Phone Number !";
      }
    
//failed validation
        if(count>0)
        {
            res.render('contactus',{
                title:"Contact Us",
               e_firstName:fNmae,
               e_lastName:lName,
               e_email: eAddr,
               e_phoneno :pNo,
               e_password:epassword,
               e1_password:e1password,
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               email:req.body.email,
               phoneno :req.body.phoneno,
               password:req.body.password
            });
        }
        else
        {
            res.render('contactus',{
                title:"Contact Us",
                message:"Congratulations !"
            });
        }
})

/*port for herocu*/
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("connection established !");
});