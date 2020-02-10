const {model , Schema}=require("mongoose");

const datesSchema = new Schema(
    {
        fechaCita:Date,
        pacienteId:{
            type:Schema.Types.ObjectId,
            ref:"Patient"
        },
        peso:Number,
        estatura:Number,
        precion:String,
        diagnostico:String,
        tratamiento:String
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Dates",datesSchema);