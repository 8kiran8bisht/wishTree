const isLoggedIn=(req,res,next)=>{
    if(req.session.login){
        next();
    }
    else{
        res.redirect("/general/signIn");
    }
}
module.exports=isLoggedIn;