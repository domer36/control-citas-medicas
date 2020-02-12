const {model , Schema}=require("mongoose");

const patientSchema = new Schema(
    {
        nombre:String,
        curp:String,
        fechaNacimiento:String,
        telefono:String,
        direccion:String,
        tipoSangre:String,
        estadoCivil:String,
        correo:String,
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Patient",patientSchema);