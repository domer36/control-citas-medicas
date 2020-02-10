const router =require("express").Router();
const Doctor = require("../models/Doctor")

router.post("/doctores",async (req,res)=>{
    const {doctor_name,doctor_cedula,doctor_especialidad,doctor_email} = req.body;
    if(doctor_name === "" || doctor_cedula==="" || doctor_especialidad===""|| doctor_email===""){
        res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const doctor = await Doctor.findOne({cedula: doctor_cedula});
    if(doctor){
        res.send({
            status:"error",
            message:"El doctor ya existe"
        })
    }
    const newDoctor = await Doctor.create( 
        {nombre: doctor_name,
        cedula: doctor_cedula,
        especialidad: doctor_especialidad,
        correo: doctor_email})
        .then(
            res.send({
                status:"done",
                message:"Doctor Guardado"
            })
        )
        .catch(
            res.send({
                status:"error",
                message:"Error al guardar"
            })
        )

})

router.set("/doctores/:id", async (req,res)=>{
    const {doctor_name,doctor_cedula,doctor_especialidad,doctor_email} = req.body;
    if(doctor_name === "" || doctor_cedula==="" || doctor_especialidad===""|| doctor_email===""){
        res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const doctor = await Doctor.findByIdAndUpdate({_id: req.params.id},
        {nombre: doctor_name,
        cedula: doctor_cedula,
        especialidad: doctor_especialidad,
        correo: doctor_email})
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

router.delete("/doctotes/:id", async(req,res)=>{
    await Doctor.findByIdAndDelete({_id: req.params.id})
    .then(
        res.send({
            status:"done",
            message:"Doctor Eliminado Correctamente"
        })
    )
    .catch(
        res.send({
            status:"error",
            message:"Error al Eliminar"
        })
    )
    
})

router.get("/doctores/:id",async(req,res)=>{
    const doctor= await Doctor.findById({_id: req.params.id})
    .then(res.send(doctor,{
        status:"done",
        message:"Doctor encontrado"
    }))
    .catch(res.send({
        status:"error",
        message:"Doctor no encontrado"
    }));
})
module.exports = router