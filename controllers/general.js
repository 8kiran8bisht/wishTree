const express = require('express')
const router = express.Router()
const productsModel=require("../model/Product");
const userModel=require("../model/User");
const bcrypt=require("bcryptjs");
const moment = require('moment');
const dashBoardLoader=require("../middleware/authorization")

router.get("/",(req,res)=>{
  let categories=[];
  let promotion=[];
  let bestSeller=[];
  let page='';
  productsModel.find()
  .then((prods)=>{
      const allPro=prods.map(prod=>{
          return{
              title:prod.title,
              img:prod.img,
              category:prod.category,
              productOn:prod.productOn
          }
      })
      for(let i=0;i<allPro.length;i++){
          if(allPro[i].productOn=="HomePage")
          {
            if(allPro[i].category=="Electronics")
               allPro[i].page="/product/electronics";
            else if(allPro[i].category=="Baby-Care")
               allPro[i].page="/product/babyCare";
            else if(allPro[i].category=="Valentine's-Day")
               allPro[i].page="/product/valentine";
            else if(allPro[i].category=="Bags")
               allPro[i].page="/product/Bags";
               
            categories.push(allPro[i]);

          }
          else if(allPro[i].productOn=="Promotion")
          promotion.push(allPro[i]);
          else if(allPro[i].productOn=="BestSeller")
          bestSeller.push(allPro[i]);
          else{}
      }
      res.render('general/home',{
        title:"Home",
        css:"css/style.css",
        products:categories,
        promotion:promotion,
        bestSeller:bestSeller
    })
  })
    .catch(err=>console.log("Error: Can't fatch data from database"));
});
/*---------------Sign In ---------------------------*/
router.get("/general/signIn",(req,res)=>{
  res.render('general/signIn',{
      title:"signIn",
      css:"../css/style.css",
  });
});
router.post("/general/signIn",(req,res)=>{
  let count=0;
  let e_userId="";
  let e_password="";
 // let userId="";
 // let password="";
  if(req.body.userId=="") {
      count++;
      e_userId="* Enter e-mail address !";
 }
 if(req.body.password=="") {
  count++;
  e_password="* Enter password !";
}

 if(count>0)
 {
     res.render('general/signIn',{
         title:"SignIn",
         css:"../css/style.css",
        e_message:e_userId,
        userId:req.body.userId, 
        p_message:e_password,
        password:req.body.password
        
  });
}
else{
  userModel.findOne({email:req.body.userId})
  .then((user)=>{
      const errs=[];
      if(user==null){
        errs.push("Sorry ! your email or password is incorrect!");
        res.render("general/signIn",{
          title:"SignIn",
          css:"../css/style.css",
          errs});
      }
      else{
        bcrypt.compare(req.body.password,user.password)
        .then((isValid)=>{
          if(isValid){
            req.session.login=user;
            dashBoardLoader(req,res);
          }
          else{
            errs.push("Sorry ! your email or password is incorrect!");
            res.render("general/signIn",{
              title:"SignIn",
              css:"../css/style.css",
              errs});
          }
        })
        .catch(err=>`Error: Can not varify password ${err}`)
      }
      
    })
  .catch(err=>`Error: Unable to varify email ${err}`)
    }
});
router.get("/general/contactus",(req,res)=>{
  res.render('general/contactus',{
      title:"Contact Us",
      css:"../css/style.css"
  });
});

router.get("/general/logOut",(req,res)=>{
  req.session.destroy();
  res.redirect("/general/signIn");
});


/*-------------------------Add a User-----------------------*/


router.post("/general/contactus",(req,res)=>{
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
    else{
        if(req.body.password.length<6 || req.body.password.length>12)
          epassword="* Password should be 6-12 charcters long !";
       else if(passwordCheck(req.body.password)==false){
          epassword="* Password should have letters and numbers only!";
      }
    }
   
    if(req.body.phoneno=="") {
      count++;
      pNo="* enter your Phone Number !";
    }
    else{
      if(telephoneCheck(req.body.phoneno)==false)
      {
          pNo="* Invalid Phone Number !";
          count++;
      } 
    }
//phone no regex
function telephoneCheck(str) {
  const patt = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
  return patt.test(str);
}

//password regex
function passwordCheck(str) {
  const patt = new RegExp(/^[0-9a-zA-Z]{6,12}$/);
  return patt.test(str);
}
//failed validation

      if(count>0)
      {
          res.render('general/contactus',{
              title:"Contact Us",
              css:"../css/style.css",
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
             password:req.body.password,
             r_password:req.body.r_password
          });
      }
      else
      {
        userModel.findOne({email:req.body.email})
        .then((user)=>{
            const errs=[];
            if(user!=null){
              errs.push("User is already registered!");
              res.render("general/contactus",{
                errs:errs,
                title:"Contact Us",
                css:"../css/style.css",});
            }
            else{
                  const {firstName,lastName,email,message,password,phoneno}=req.body;
                  /*instance of the userModel and call save method*/
                  const newUser={
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    message:message,
                    password:password,
                    phoneno:phoneno,
                    //dateCreated:moment().format('YYYY-DD-MM')
                  }

                  const user=new userModel(newUser);
                  user.save()
                  .then(()=>{
                    res.redirect("/");
                  })
                  .catch(err=>console.log(`Error to connect the data base${err}`))
                    const sgMail = require('@sendgrid/mail');
                  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                  const msg = {
                      to:`${email}`,
                      from: `registration@wishtree.com`,
                      subject: 'Wish tree registration',
                      html: `
                      Hi ${firstName},<br><br>
                      <strong>Congratulation!<br>
                      You are registered successfully.</strong>
                      <br>
                      <br>
                      Best,
                      <br>
                      wishTree Registration Team
                      `,
                    };
              //Asynchronus operation:we dont know how much time it wii take
              
              sgMail.send(msg)
              //checking 
                  .then(()=>{
                    res.redirect("/");
                  })
                  .catch(err=>{
                      console.log(`Error ${err}`);
                  });
                    
      }
})
.catch(err=>"Error: Erroe in varifying Email address !")
}
})
module.exports=router;