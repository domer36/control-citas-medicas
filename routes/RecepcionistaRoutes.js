const router =require("express").Router();
const Recepcionista = require("../models/Recepcionista")

router.post("/recepcionista",async (req,res)=>{
    const {recepcionista_name,recepcionista_correo} = req.body;
    if(recepcionista_name === "" || recepcionista_correo ){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const recepcionista = await Recepcionista.findOne({nombre: recepcionista_name});
    if(recepcionista && ){
        return res.send({
            status:"error",
            message:"Valor ya existe"
        })
    }
    const newRecepcionista = await Recepcionista.create( 
        {nombre: recepcionista_name,
        correo: recepcionista_correo})
        .then(
            res.send({
                status:"done",
                message:"Guardado correctamente"
            })
        )
        .catch(
            res.send({
                status:"error",
                message:"Error al guardar"
            })
        )

})

router.put("/recepcionista/:id", async (req,res)=>{
    const {recepcionista_name,recepcionista_correo} = req.body;
    if(recepcionista_name === "" || recepcionista_correo===""){
        return res.send({
            status:"error",
            message:"Favor de llenar todos los campos requeridos"
        })
    }
    const recepcionista = await Recepcionista.findByIdAndUpdate({_id: req.params.id},
        {nombre: recepcionista_name,
        correo: recepcionista_correo})
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

router.delete("/recepcionista/:id", async(req,res)=>{
    await Recepcionista.findByIdAndDelete({_id: req.params.id})
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

router.get("/recepcionista/:id",async(req,res)=>{
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