const { model , Schema }=require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
    {
        userName:String,
        role:{
            type: String,
            enum:["ADMIN","DOCTOR","RECEPCIONISTA"],
            default:"DOCTOR"
        }
    },
    {
        timestamps:true
    }
);

userSchema.plugin(PLM,{userNameFiel:"userName"});
module.exports = module("User",userSchema);