const router =require("express").Router();
const Dates = require("../models/Dates")

router.post("/dates",async (req,res)=>{
    const {fechaCita,
           hora,
           paciente,
           peso,
           estatura,
           precion,
           diagnostico,
           tratamiento,
           doctor,
           especialidad} = req.body;
    if(fechaCita==="" || 
       hora==="" || 
       paciente==="" || 
       peso==="" ||
       estatura==="" ||
       precion==="" || 
       diagnostico==="" || 
       tratamiento==="" ||
       doctor==="" ||
       especialidad===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const dates = await Dates.findOne({fechaCita,hora});
    if(dates){
        return res.send({
            status:"error",
            message:"La cita ya existe"
        })
    }
    await Dates.create( 
        {
            fechaCita,
            hora,
            paciente,
            peso,
            estatura,
            precion,
            diagnostico,
            tratamiento,
            doctor,
            especialidad
        })
        .then(
            res.send({
                status:"done",
                message:"Cita Guardada"
            })
        )
        .catch(
            res.send({
                status:"error",
                message:"Error al guardar"
            })
        )

})

router.put("/dates/:id", async (req,res)=>{
    const {
        fechaCita,
        hora,
        paciente,
        peso,
        estatura,
        precion,
        diagnostico,
        tratamiento,
        doctor,
        especialidad} = req.body;
    if(fechaCita==="" || 
       hora==="" || 
       paciente==="" || 
       peso==="" ||
       estatura==="" ||
       precion==="" || 
       diagnostico==="" || 
       tratamiento==="" ||
       doctor==="" ||
       especialidad===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    if(await Dates.findOne({fechaCita,hora})){
        return res.send({
            status:"error",
            message:"La cita ya existe"
        })
    }
    await Dates.findByIdAndUpdate({_id: req.params.id},
        {   
            fechaCita,
            hora,
            paciente,
            peso,
            estatura,
            precion,
            diagnostico,
            tratamiento,
            doctor,
            especialidad})
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
            message:"Cita eliminada Correctamente"
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
    const dates= await Dates.findById(req.params.id)
    dates.status="done";
    dates.message="Paciente Encontrado"
    if(dates) return res.send(dates)
    else return{status:"error",
                message:"No se encontro la cita"}
})
module.exports = router

// router.get("/especialidad",async(req,res)=>{
//     const dates= await Dates.findById(req.params.id)
//     dates.status="done";
//     dates.message="Paciente Encontrado"
//     if(dates) return res.send(dates)
//     else return{status:"error",
//                 message:"No se encontro la cita"}
// })
module.exports = router

