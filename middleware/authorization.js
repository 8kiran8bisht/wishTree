const dashBoardLoader=(req,res,next)=>{
    if(req.session.login.type=="clerk")
    {
        res.redirect("/product");
    }
    else{
        res.redirect("/shoppingCart")
    }
}
module.exports=dashBoardLoader;