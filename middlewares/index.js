const checkIfAuthenticated = function (req,res,next){
    if(req.session.user){
        next();
    }else{
        
        req.flash('error_messages','sorry you need to log in to the account');
        res.status(401);
        res.redirect('/user/login');
    }
   
}

module.exports = {checkIfAuthenticated}