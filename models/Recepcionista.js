const {model , Schema}=require("mongoose");

const recepcionistaSchema = new Schema(
    {
        nombre:String,
        correo:String
    },
    {
        timestamps:true,
        versionKey: false
    }
);

module.exports = model("Recepcionista",recepcionistaSchema);