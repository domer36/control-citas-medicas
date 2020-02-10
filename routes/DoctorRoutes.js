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
    const newDoctor = await Doctor.create( {nombre: doctor_name,
                                             cedula: doctor_cedula,
                                             especialidad: doctor_especialidad,
                                             correo: doctor_email})
    res.send({
        status:"done",
        message:"Doctor Guardado"
    })

})

module.exports = router