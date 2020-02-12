const router =require("express").Router();
const User = require("../models/User");
const passport = require("../config/passport");

router.get("/signup",(req,res)=>res.render("auth/signup"))

router.post("/auth/signup", async (req,res)=>{
    console.log('aqui');
    
    const { email,role,password }=req.body;
    console.log(email, role, password);
    
    if(email==="" || password===""){
        return res.render("/auth/signup",{message:"Llena todos los campos"});
    }
    console.log('pasando');
    
    const user = await User.findOne({email});
    if(user){
        return res.render("auth/signup",{message:"El usuario ya existe"});
    }
    console.log('por aca');
    
    const newUser=await User.register({email,role},
                         password);
    console.log(newUser);
    res.redirect("/login");    
})


router.get("/login",async(req,res)=>res.render("auth/login"));

router.post("/auth/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"})
)

router.get("/logout",async(req,res,next)=>{
    req.logOut();
    res.redirect("/login")
})

module.exports = router