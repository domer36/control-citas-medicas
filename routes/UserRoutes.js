const router =require("express").Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/signup",(req,res)=>res.render("auth/signup"))

router.post("/signup", async(req,res)=>{
    const { username,role,password }=req.body;
    if(username==="" || password==="")
    res.render("/auth/signup",{message:"Llena todos los campos"});
    const user = await User.findOne({userName:user});
    if(user)
        res.render("auth/signup",{message:"El usuario ya existe"});
    await User.register({userName:username,role:role},password);
    res.redirect("/auth/login");    
})


router.get("/login",async(req,res)=>res.render("auth/login"));

router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"})
)

router.get("/logout",async(req,res,next)=>{
    req.logOut();
    res.redirect("/login")
})

module.exports = router