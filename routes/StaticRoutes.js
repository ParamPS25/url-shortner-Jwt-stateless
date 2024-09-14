const express = require("express");
const router = express.Router();
const Url = require("../models/urlModel");

// router.get('/',async(req,res)=>{
//     const allUrls = await Url.find({});
//     return res.render("home.ejs",
//         {urls:allUrls}
//     );
// })      here finding allUrl for "/" instead will restrict only to current user who is logged in

router.get('/',async(req,res)=>{
    // so initially on first visit it will not have req.user property => will redirect to login.ejs
    if(!req.user) return res.redirect("/login");                 // req.user added property to req object by authMiddleware // after loggedin it will have req.user property
    const userUrls = await Url.find({createdBy:req.user._id});
    const showUser = req.user.email
    return res.render("home.ejs",{
            urls:userUrls,
            user:showUser
        })
})

router.get('/signup',async(req,res)=>{
    res.render("signup.ejs")
})

router.get('/login',async(req,res)=>{
    res.render("login.ejs")
})

module.exports = router;