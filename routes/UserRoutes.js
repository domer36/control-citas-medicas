const router =require("express").Router();
const User = require("../models/User");
const passport = require("../config/passport");



router.post("/signup", async (req,res)=>{
    
    const { email,role,password }=req.body;
    
    if(email==="" || password===""){
        return res.render("/signup",{message:"Llena todos los campos"});
    }
    
    const user = await User.findOne({email});
    if(user){
        return res.send({
        status:"error",
        message:"El Usuario ya existe"});
    }
    
    const newUser=await User.register({email,role},password);
    res.send({ status: "done"})  
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

.get('/user/:id', async (req, res) => {
    const usuario = await User.findById( req.params.id)

    res.send(usuario)
})

module.exports = router