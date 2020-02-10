const router = require('express').Router()
const Doctor = require('../models/Doctor')
const Recepcionista = require('../models/Recepcionista')

router.get('/', (req,res) => res.render('index'))
router.get('/get/doctorForm', async (req,res) => {
    const doctores = await Doctor.find()
    res.render('register/doctor', {doctores})
})

router.get('/get/recepcionistaForm', async (req,res) => {
    const recepcionistas = await Recepcionista.find()
    res.render('register/recepcionista', {recepcionistas})
})
router.get('/get/employeesForm', (req,res) => res.render('register/employess'))


module.exports = router