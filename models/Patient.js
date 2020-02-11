const {model , Schema}=require("mongoose");

const patientSchema = new Schema(
    {
        nombre:String,
        curp:String,
        fechaNacimiento:Date,
        telefono:String,
        direccion:String,
        tipoSangre:String,
        estadoCivil:String,
        correo:String,
        doctorId:{
            type:Schema.Types.ObjectId,
            ref:"doctors"
        }
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Patient",patientSchema);