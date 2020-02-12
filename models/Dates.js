const {model , Schema}=require("mongoose");

const datesSchema = new Schema(
    {
        fechaCita:String,
        hora:{
            type: String,
            min:1,
            max:7,
            required:true
        },
        paciente:{
            type:Schema.Types.ObjectId,
            ref:"Patient"
        },
        peso:String,
        estatura:String,
        precion:String,
        diagnostico:String,
        tratamiento:String,
        especialidad: {
            type: Schema.Types.ObjectId,
            ref: 'Especialidade'
        },
        doctor:{
            type:Schema.Types.ObjectId,
            ref:"Doctor"
        }
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Dates",datesSchema);