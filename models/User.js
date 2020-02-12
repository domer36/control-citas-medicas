const { model , Schema }=require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
    {
        email:String,
        role:{
            type: String,
            enum:["ADMIN","DOCTOR","RECEPCIONISTA"],
            default:"DOCTOR"
        }
    },
    {
        timestamps:true,
        versionKey: false
    }
);

userSchema.plugin(PLM, { usernameField: "email" });
module.exports = model("User",userSchema);