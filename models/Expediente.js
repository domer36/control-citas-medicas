const {model , Schema}=require("mongoose");

const expedienteSchema = new Schema(
    {
        patienteId:{
            type:Schema.Types.ObjectId,
            ref:"Patient"
        },
        consultas:[
            {
                type:Schema.Types.ObjectId,
                ref:"Dates"
            }
        ]
    },
    {
        timestamps:true
    }
);

module.exports = module("Expediente",expedienteSchema);