const {model , Schema}=require("mongoose");

const doctorSchema = new Schema(
    {
        nombre:String,
        cedula:String,
        especialidad:String,
        correo:String
    },
    {
        timestamps:true
    }
);

module.exports = module("Doctor",doctorSchema);