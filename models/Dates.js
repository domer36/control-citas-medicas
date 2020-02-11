const {model , Schema}=require("mongoose");

const datesSchema = new Schema(
    {
        fechaCita:Date,
        hora:{
            type: String,
            min:1,
            max:7,
            required:true
        },
        paciente:{
            type:Schema.Types.ObjectId,
            ref:"patients"
        },
        peso:Number,
        estatura:Number,
        precion:String,
        diagnostico:String,
        tratamiento:String,
        doctor:{
            type:Schema.Types.ObjectId,
            ref:"doctors"
        }
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Dates",datesSchema);