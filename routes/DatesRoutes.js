const { Router }=require("express");
const router=Router();
const Doctor = require("../models/Doctor")

router.post("/doctores",async (req,res)=>{
    const {doctor_name,doctor_cedula,doctor_especialidad,doctor_email} = req.body;
    if(doctor_name === "" || doctor_cedula==="" || doctor_especialidad===""|| doctor_email===""){
        res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const doctor = await Doctor.findOne({doctor_cedula});
    if(doctor){
        res.send({
            status:"error",
            message:"El doctor ya existe"
        })
    }
    const newDoctor = await Doctor.register( doctor_name,
                                             doctor_cedula,
                                             doctor_especialidad,
                                             doctor_email)
    res.send({
        status:"done",
        message:"Doctor Guardado"
    })

})