const router = require('express').Router()
const Doctor = require('../models/Doctor')
const Recepcionista = require('../models/Recepcionista')
const Pacientes = require('../models/Patient')
const Cita = require('../models/Dates')
const Especialidad = require('../models/Especialidades')

//router.get('/', (req,res) => res.render('index'))
router.get('/get/doctorForm', async (req,res) => {
    const doctores = await Doctor.find().populate('especialidad')
    const especialidades = await Especialidad.find().sort({nombre: 1})
    
    res.render('register/doctor', {doctores, especialidades})
})

router.get('/get/recepcionistaForm', async (req,res) => {
    const recepcionistas = await Recepcionista.find()
    res.render('register/recepcionista', {recepcionistas})
})
router.get('/get/pacienteForm', async (req,res) => {
    const pacientes = await Pacientes.find()
    const doctores = await Doctor.find()
    console.log(pacientes)
    res.render('register/paciente', {pacientes, doctores})
})
router.get('/get/citasForm', async (req,res) => {
    const citas = await Cita.find().populate('paciente').populate('doctor').populate('especialidad')
    
    const pacientes = await Pacientes.find()
    const doctores = await Doctor.find()
    const especialidades = await Especialidad.find().sort({nombre: 1})
    res.render('register/citas', {citas,pacientes,especialidades})
})

.get('/especialidad/:id', async (req, res)=>{
    const doctores = await Doctor.find({especialidad: req.params.id}, {_id:1,nombre:1})
    res.send(doctores)
    console.log(doctores);
    
})


module.exports = router