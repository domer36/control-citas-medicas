const router =require("express").Router();
const Dates = require("../models/Dates")

router.post("/dates",async (req,res)=>{
    const{fechaCita,hora,pacienteId,peso,estatura,precion,diagnostico,tratamiento}=req.body;
    if(fechaCita==="" || hora==="" || pacienteId==="" || peso==="" || estatura==="" ||
    precion==="" || diagnostico==="" || tratamiento===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const dates = await Dates.findOne({fechaCita,hora});
    if(dates){
        return res.send({
            status:"error",
            message:"La hora ya esta ocupada"
        });
    }   
    await Dates.create({
        fechaCita,hora,pacienteId,peso,estatura,precion,diagnostico,tratamiento})
    .then( 
        res.send({
        status:"done",
        message:"Guardado correctamente"
    }))
    .catch(
        res.send({
            status:"error",
            message:"Error al guardar"
        })
    )
})

router.put("/dates/:id", async (req,res)=>{
    const{fechaCita,hora,pacienteId,peso,estatura,precion,diagnostico,tratamiento}=req.body;
    if(fechaCita==="" || hora==="" || pacienteId==="" || peso==="" || estatura==="" ||
    precion==="" || diagnostico==="" || tratamiento===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    await Dates.findByIdAndUpdate({_id: req.params.id},
        {fechaCita,hora,pacienteId,peso,estatura,precion,diagnostico,tratamiento})
        .then(
            res.send({
                status:"done",
                message:"Datos Actualizados Correctamente"
            })
        )
        .catch(
            res.send({
                status:"error",
                message:"Error al actualizar Datos"
            })
        )
    
} )

router.delete("/dates/:id", async(req,res)=>{
    await Dates.findByIdAndDelete({_id: req.params.id})
    .then(
        res.send({
            status:"done",
            message:"Dato Eliminado Correctamente"
        })
    )
    .catch(
        res.send({
            status:"error",
            message:"Error al Eliminar"
        })
    )
    
})

router.get("/dates/:id",async(req,res)=>{
    const recepcionista= await Dates.findById(req.params.id)
    dates.status="done";
    dates.message="Dato Encontrado"
    if(dates) return res.send(dates)
    else return{status:"error",
                message:"Dato no encontrado"}
})