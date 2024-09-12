const{getUser} = require("../services/auth")

async function restrictToLoggedinUsersOnly(req,res,next){

    const user_uid = req.cookies?.uid; //as named our cookie "uid" also installed cookie parser for it // so will get uid and passing that uid to getUser(id) which get us particular user mapped with that uid
    
    if(!user_uid) return res.redirect("/login");

    const user =  getUser(user_uid);
    if(!user) return res.redirect("/login");
    console.log(user);
    // as middleware can add req,res object properties so,
    req.user = user; //If a valid user is found, their information is attached to the req object. This makes the user information available to subsequent middleware and route handlers.
    next();
}
//Once the authMiddleware has run, any subsequent middleware or route handlers can access the req.user //This is useful for actions that require user-specific data

async function checkAuth(req,res,next){      //not forcing for login just checking if logged in or not
    const find_user = req.cookies?.uid;
    const user = getUser(find_user);
    req.user = user;
    next();
}

module.exports ={
    restrictToLoggedinUsersOnly,
    checkAuth,
}