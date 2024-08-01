module.exports.isLogedin=async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.Redirect=req.originalUrl;
        req.flash("error2",`Pls Login first Here!`)
        res.redirect('/login')
    }
    else {
        next();
    }
}
module.exports.saveURL=async(req,res,next)=>{
    if(req.session.Redirect){
        res.locals.redirect=req.session.Redirect
    }
    next();
}