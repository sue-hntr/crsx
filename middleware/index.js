//middleware has acess to reqest, response and next function
//session middleware makes session info available through the req object


//go to profile page if logged in
//placed in register and login to hide those pages(html) and routes (localhost: 3000/register)
function loggedOut(req, res, next){
    if (req.session && req.session.userId){
        return res.redirect('/profile');
    }
    return next();
}

//error view must be logged in to view the page
function requiresLogin(req, res, next){
    if (req.session && req.session.userId){
        return next();
    } else {
        var err = new Error('You must be logged in to view this page');
        err.status = 401;
        return next(err);
    }
}


module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;