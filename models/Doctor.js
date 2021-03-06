const {model , Schema}=require("mongoose");

const doctorSchema = new Schema(
    {
        nombre:String,
        cedula:{
            type:String,
            unique:true
        },
        especialidad: {
            type: Schema.Types.ObjectId,
            ref: 'Especialidade'
        },
        correo:String
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Doctor",doctorSchema);