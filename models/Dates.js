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
            ref:"Patient"
        },
        peso:Number,
        estatura:Number,
        precion:String,
        diagnostico:String,
        tratamiento:String,
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