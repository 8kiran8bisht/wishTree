const express = require('express')
const router = express.Router();
const orderModel=require("../model/Order");
const productsModel=require("../model/Product");
const path=require("path");
const isAuthenticated=require("../middleware/auth");

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
               <div><a href="/product/bags" style="text-decoration: none;">Bags</a></div>
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
  
  /*------------------------Products on home page---------------------------------*/
router.get("/product/products",(req,res)=>{
    productsModel.find({productOn:`HomePage`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            });
            for(let i=0;i<allPro.length;i++){
               if(allPro[i].category=="Electronics")
                     allPro[i].page="/product/electronics";
                  else if(allPro[i].category=="Baby-Care")
                     allPro[i].page="/product/babyCare";
                  else if(allPro[i].category=="Valentine's-Day")
                     allPro[i].page="/product/valentine";
                  else if(allPro[i].category=="Bags")
                     allPro[i].page="/product/Bags";
                  else{}

            }
    res.render('product/products',{
        title:"products",
        css:"../css/style.css",
        page:"/product/products",
        nav:nav,
        products:allPro 
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});
//----------ProductDashBoard--------------
router.get("/product",isAuthenticated,(req,res)=>{
    productsModel.find()
    .then((prods)=>{
        const allPro=prods.map(prod=>{
            return{
                id:prod._id,
                title:prod.title,
                img:prod.img,
                productOn:prod.productOn,
                category:prod.category,
                price:prod.price,
                description:prod.description,
                quantity:prod.quantity,
                css:"../../css/style.css"
            }
        })
        res.render("product/productDashboard",{
            data:allPro,
            css:"../css/table.css"
        });
    })
    .catch(err=>`Error: Error in pulling data Error101 ${err}`)
    
})
//--------------------------------------------
router.post("/product/basicSearch",(req,res)=>{
        res.redirect(`${req.body['product-search']}`);
})
//---------Search Product By Category----------
router.post("/product/search",(req,res)=>{
    if(req.body['product-search']!='all')
    {
        productsModel.find({category:`${req.body['product-search']}`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    productOn:prod.productOn,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description,
                    quantity:prod.quantity
                }
            })
            res.render("product/productDashboard",{
                data:allPro,
                css:"../css/table.css",
                search:req.body['product-search']
            });
        })
        .catch(err=>`Error: Error in pulling data Error101 ${err}`)
    }
    else{
        res.redirect("/product");
    }  
    
})
//------Add a product--------------
router.get('/addProducts',isAuthenticated,(req,res)=>{
    res.render('product/addProducts',{
        title:"Add Products",
        css:"../../css/style.css",
       
    });

});

router.post("/product/addProducts/",(req,res)=>
{
    const extlist=['.JPEG','.JPG','.GIF','.PNG'];
    const err=[];
    if(extlist.includes(`${path.parse(req.files.img.name).ext}`.toUpperCase())!=true)
    {
        err.push("Only jpg, gif, png extention are allowed!");
        res.render('product/addProducts',{
            title:"Add Products",
            css:"../../css/style.css",
            err,
           
        });
    }
    else{
        const newProduct={
                category:req.body.category,
                title:req.body.title,
                description:req.body.description,
                price:req.body.price,
                productOn:req.body.productOn,
                quantity:req.body.quantity
                
            }
    
        const addproduct= new productsModel(newProduct);
  
        addproduct.save()
        .then((user)=>{
            req.files.img.name=`por_pic_${user._id}${path.parse(req.files.img.name).ext}`;
            req.files.img.mv(`public/uploads/${req.files.img.name}`)
            .then(()=>{
                productsModel.updateOne({_id:user._id},{
                    img:req.files.img.name
                })
                .then(()=>{
                    res.redirect(`/product`);
                }
                )
            })
            .catch(err=>console.log(`Error: unable to upload file ${err}`))
        
        })
        .catch(err=>`Error: Error putting data in data base ${err}`)
    }
});
//-----------------------------Edit a product--------------------------------------

router.get("/editProduct/:id",isAuthenticated,(req,res)=>{
    productsModel.findById(req.params.id)
    .then((idVal)=>{
        const {_id,img,productOn,category,title,description,price,quantity}=idVal;
        res.render("product/editProduct",{
            _id,
            img,
            productOn,
            category,
            title,
            description,
            price,
            quantity,
            css:"../../css/style.css"
        })
    })
    .catch(err=>`Error: Cant pull data bu Id from Db ${err}`)
});
//------------------------------Update a product-------------------------------------
router.put("/updateProduct/:id",isAuthenticated,(req,res)=>{
    
    req.files.img.name=`por_pic_${(req.params.id)}${path.parse(req.files.img.name).ext}`;
    const pIdVal={
        img:req.files.img.name,
        productOn:req.body.productOn,
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity
    }
    
    productsModel.updateOne({_id:(req.params.id)},pIdVal)
    .then(()=>{
        req.files.img.mv(`public/uploads/${req.files.img.name}`)
        .then(()=>{
            res.redirect('/product');})
        .catch(err=>"Error: unable to upload ");
        
    })
    .catch(err=>{console.log(`Error: Error while Updating product ${err} `)})
})

//-----------------------------Delete the product--------------------------------------


router.delete("/deleteProduct/:id",(req,res)=>{
    productsModel.deleteOne({_id:(req.params.id)})
    .then(()=>{
        res.redirect('/product');
    })
    .catch(err=>{console.log(`Error: Error while deleteing product from data base ${err} `)})
})
//--------------------------Product Description-----------------------------------------
router.get("/product/productDescription/:id",(req,res)=>{
productsModel.findById(req.params.id)
    .then((idVal)=>{
        const {_id,img,productOn,category,title,description,price,quantity}=idVal;
        res.render("product/productDescription",{
            _id,
            img,
            category,
            title,
            description,
            price,
        css:"../../css/table.css",
        })
    })
    .catch(err=>`Error: Cant pull data bu Id from Db ${err}`)
  });
/* this is done*/
  router.post("/product/productDescription/",(req,res)=>
{
   const newOrder={
      
        img:req.body.img,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity
    }

    const order= new orderModel(newOrder);
    order.save()
        .then((orders)=>{
            res.redirect('/shoppingCart');
        })
    .catch(err=>`Error: Error putting data in data base ${err}`)
});
//-----------------------------------------------------------------------
router.get('/shoppingCart',isAuthenticated,(req,res)=>{
    orderModel.find({"status":1})
    .then((orders)=>{
        let balance=0;
        let status=false;
        for(let i=0;i<orders.length;i++){
            balance=balance+(orders[i].price*orders[i].quantity);
        }
        const filteredOrder=orders.map(order=>{
            return{
                id:order._id,
                img:order.img,
                title:order.title,
                description:order.description,
                price:order.price,
                quantity:order.quantity,
                total:order.quantity*order.price
                
            }
        })
        if(balance>0)
        status=true;
        res.render('product/shoppingCart',{
            data:filteredOrder,
            balance:balance,
            status:status,
            css:"../css/table.css"
        });
    })
    .catch(err=>`Error: error in fatching data from data base ${err}`);
    
})
//--------------------Send the order Confermation ----------------------------------------------------------------
router.post("/product/shoppingCart",isAuthenticated,(req,res)=>{
    orderModel.find({"status":1})
    .then((orders)=>{
        let balance=0;
        let str="<table border='1' style='text-align: center;'><tr><td><strong>S.No</strong></td><td><strong>Title</strong></td><td><strong>Unit Price</strong></td><td><strong>Quantity</strong></td><td><strong>Total</strong></td></tr>";
        for(let i=0;i<orders.length;i++){
            balance=balance+(orders[i].price*orders[i].quantity);
            str+=`<tr><td>${i+1}</td><td>${orders[i].title}</td><td>${orders[i].price}</td><td>${orders[i].quantity}</td><td>${orders[i].price*orders[i].quantity}</td></tr></strong>`
        }
        str+=`<tr><td colspan="4"><strong>Total Amount<strong></td><td>${balance}</td></tr>
        </table>`;
         /*const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
                to:`8kiran8bisht@gmail.com`,
                from: `order@wishtree.com`,
                subject: 'Order Confirmation From Wish Tree',
                html: `${str}`
              };
        //Asynchronus operation:we dont know how much time it wii take
        
        sgMail.send(msg)
        //checking 
            .then(()=>{
              res.redirect("/");
            })
            .catch(err=>{
                console.log(`Error ${err}`);
            });*/
            //{"created": false}, {"$set":{"created": true}}
            orderModel.updateMany({"status":1},{"$set":{"status":0}})
            .then(()=>{
                res.redirect('/');
            })
            .catch(err=>console.log("Unable to place the order "));
    })
    .catch(err=>`Error: error in fatching data from data base ${err}`);
    
});

//--------------------Baby Care----------------------  //
router.get("/product/babyCare",(req,res)=>{
    productsModel.find({category:`Baby-Care`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/babyCare',{
        title:"babyCare",
        css:"../css/style.css",
        nav:nav,
        products:allPro,
        page:'/product/babyCare'
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});

/*-----------------------Bags----------------------*/
router.get("/product/bags",(req,res)=>{
    productsModel.find({category:`Bags`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/bags',{
        title:"Bags",
        css:"../css/style.css",
        nav:nav,
        products:allPro,
        page:'/product/bags'
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});
/*-------------------------On Promotion----------------------------------*/
router.get("/product/onPromotion",(req,res)=>{
    productsModel.find({productOn:`Promotion`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/onPromotion',{
        title:"onPromotion",
        css:"../css/style.css",
        nav:nav,
        products:allPro,
        page:'product/onPromotion'
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});
/*--------------------------------Best Seller------------------------------------------------*/
router.get("/product/bestSeller",(req,res)=>{
    productsModel.find({productOn:`BestSeller`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/bestSeller',{
        title:"bestSeller",
        css:"../css/style.css",
        nav:nav,
        products:allPro 
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});

/*----------------------------valentine-----------------------------------------*/
router.get("/product/valentine",(req,res)=>{
    productsModel.find({category:`Valentine's-Day`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/valentine',{
        title:"valentine",
        css:"../css/style.css",
        nav:nav,
        products:allPro,
        page:'/product/valentine'
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});
/*-----------------------Electronics---------------------------*/
router.get("/product/electronics",(req,res)=>{
    productsModel.find({category:`Electronics`})
        .then((prods)=>{
            const allPro=prods.map(prod=>{
                return{
                    id:prod._id,
                    title:prod.title,
                    img:prod.img,
                    category:prod.category,
                    price:prod.price,
                    description:prod.description
                }
            })
    res.render('product/electronics',{
        title:"electronics",
        css:"../css/style.css",
        nav:nav,
        products:allPro ,
        page:'/product/electronics'
    });
})
.catch(err=>console.log(`Error: Cant find the page ${err}`))
});

module.exports=router;