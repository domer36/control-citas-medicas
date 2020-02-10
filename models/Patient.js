const {model , Schema}=require("mongoose");

const patientSchema = new Schema(
    {
        nombre:String,
        fechaNacimiento:Date,
        telefono:Number,
        direccion:String,
        tipoSangre:String,
        estadoCivil:String,
        correo:String,
        doctorId:{
            type:Schema.Types.ObjectId,
            ref:"Doctor"
        }
    },
    {
        timestamps:true
    }
);

module.exports = module("Patient",patientSchema);