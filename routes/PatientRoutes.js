const router =require("express").Router();
const Patient = require("../models/Patient")

router.post("/patient",async (req,res)=>{
    const {patient_name,
           patient_curp,
           patient_fechaNacimiento,
           patient_telefono,
           patient_direccion,
           patient_tipoSangre,
           patient_estadoCivil,
           patient_correo,
           patient_doctor} = req.body;
    if(patient_name==="" || 
       patient_curp==="" || 
       patient_fechaNacimiento==="" || 
       patient_telefono==="" ||
       patient_direccion==="" ||
       patient_tipoSangre==="" || 
       patient_estadoCivil==="" || 
       patient_correo==="" || 
       patient_doctor ===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const patient = await Patient.findOne({curp: patient_curp});
    if(patient){
        return res.send({
            status:"error",
            message:"El paciente ya existe"
        })
    }
    if(await Patient.findOne(patient_doctor).populate(_id)){
        return res.send({
            status:"error",
            message:"El Doctor no existe"
        })
    }
    await Patient.create( 
        {
            nombre:patient_name,
            curp:patient_curp,
            fechaNacimiento:patient_fechaNacimiento,
            telefono:patient_telefono,
            direccion:patient_direccion,
            tipoSangre:patient_tipoSangre,
            estadoCivil:patient_estadoCivil,
            correo:patient_correo,
            doctorId:patient_doctor
        })
        .then(
            res.send({
                status:"done",
                message:"Paciente Guardado"
            })
        )
        .catch(
            res.send({
                status:"error",
                message:"Error al guardar"
            })
        )

})

router.put("/patient/:id", async (req,res)=>{
    const {
        patient_name,
        patient_curp,
        patient_fechaNacimiento,
        patient_telefono,
        patient_direccion,
        patient_tipoSangre,
        patient_estadoCivil,
        patient_correo,
        patient_doctor} = req.body;
    if(patient_name==="" || 
       patient_curp==="" || 
       patient_fechaNacimiento==="" || 
       patient_telefono==="" ||
       patient_direccion==="" ||
       patient_tipoSangre==="" || 
       patient_estadoCivil==="" || 
       patient_correo==="" || 
       patient_doctor ===""){
    return res.send({
        status:"error",
        message:"Favor de llenar todos los campos requeridos"
        })
    }
    if(await Patient.findOne({curp: patient_curp})){
        return res.send({
            status:"error",
            message:"El paciente ya existe"
        })
    }
    await Patient.findByIdAndUpdate({_id: req.params.id},
        {   
            nombre:patient_name,
            curp:patient_curp,
            fechaNacimiento:patient_fechaNacimiento,
            telefono:patient_telefono,
            direccion:patient_direccion,
            tipoSangre:patient_tipoSangre,
            estadoCivil:patient_estadoCivil,
            correo:patient_correo,
            doctorId:patient_doctor
        })
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

router.delete("/patient/:id", async(req,res)=>{
    await Patient.findByIdAndDelete({_id: req.params.id})
    .then(
        res.send({
            status:"done",
            message:"Paciente Eliminado Correctamente"
        })
    )
    .catch(
        res.send({
            status:"error",
            message:"Error al Eliminar"
        })
    )
    
})

router.get("/patient/:id",async(req,res)=>{
    const patient= await Patient.findById(req.params.id)
    patient.status="done";
    patient.message="Paciente Encontrado"
    if(patient) return res.send(patient)
    else return{status:"error",
                message:"No se encontro el paciente"}
})
module.exports = router