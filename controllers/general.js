const express = require('express')
const router = express.Router()
const productModel = require("../model/products");
router.get("/",(req,res)=>{
  res.render('general/home',{
      title:"Home",
      css:"css/style.css",
      products:productModel.getAllProducts(),
      promotion:productModel.getAllPromotion(),
      bestSeller:productModel.getBestSeller()

  });
});

router.get("/general/signIn",(req,res)=>{
  res.render('general/signIn',{
      title:"signIn",
      css:"../css/style.css",
  });
});
router.post("/general/signIn",(req,res)=>{
  let count=0;
  let e_userId="";
  if(req.body.userId=="") {
      count++;
      e_userId="* Enter e-mail address or mobile phone number !";
 }

 if(count>0)
 {
     res.render('general/signIn',{
         title:"SignIn",
         css:"../css/style.css",
        e_message:e_userId,

  });
}
else{
        res.redirect("/");
      }
});
router.get("/general/contactus",(req,res)=>{
  res.render('general/contactus',{
      title:"Contact Us",
      css:"../css/style.css"
  });
});
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
        if(req.body.password<6 || req.body.password>12)
          epassword="* Password should be 6-12 charcters long !";
       else if(passwordCheck(req.body.password)==false){
          epassword="* Password should must have letters and numbers only!";
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
             password:req.body.password
          });
      }
      else
      {
         /* res.render('general/contactus',{
              title:"Contact Us",
              css:"../css/style.css",
              message:"Congratulations !"
          });*/

         
            const {firstName,lastName,email,message}=req.body;
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
                to:`${email}`,
                from: `registration@wishtree.com`,
                subject: 'Wish tree registration',
                html: `
                Hi ${firstName},<br><br>
                <strong>You are registered successfully</strong>`,
              };
        //Asynchronus operation:we dont know how much time it wii take
        
        sgMail.send(msg)
        /*checking */
            .then(()=>{
              res.redirect("/");
            })
            .catch(err=>{
                console.log(`Error ${err}`);
            });

      }
})

module.exports=router;