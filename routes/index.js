const router = require('express').Router()
const Doctor = require('../models/Doctor')
const Recepcionista = require('../models/Recepcionista')
const Pacientes = require('../models/Patient')
const Cita = require('../models/Dates')
const Especialidad = require('../models/Especialidades')
const Usuario = require('../models/User')

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

    req.app.locals.isDoctor = (req.user.role === 'DOCTOR') ? true : false
    req.app.locals.isAdmin = (req.user.role === 'ADMIN') ? true : false
    res.render('register/citas', {citas,pacientes,especialidades})
})


router.get('/get/usuariosForm', async (req,res) => {
    const usuarios = await Usuario.find()

    res.render('register/usuarios', {usuarios})
})

.get('/especialidad/:id', async (req, res)=>{
    const doctores = await Doctor.find({especialidad: req.params.id}, {_id:1,nombre:1})
    res.send(doctores)
    console.log(doctores);
    
})

.get('/atender_cita/:id', async (req, res) => {
    const cita = await Cita.findOne({_id: req.params.id}).populate('paciente').populate('doctor').populate('especialidad')
    res.render('register/atendercita', cita)
})

.put('/guardardiagnostico/:id', async (req, res) => {
    const {peso, estatura, precion, diagnostico, tratamiento} = req.body
    await Cita.findByIdAndUpdate({_id: req.params.id}, {peso, estatura, precion, diagnostico, tratamiento})
    res.send({status: 'done'})
})

.put('/user/:id', async (req, res)=>{
    const {email, role}= req.body
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, {email, role})
    if(usuario) res.send({status: 'done'})
    else res.send({status: 'error'})
})

.delete('/user/:id', async (req, res) => {
    await Usuario.findByIdAndDelete( req.params.id )
    res.send({status: 'done'})
})



module.exports = router