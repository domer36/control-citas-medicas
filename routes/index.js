const router = require('express').Router()
const Doctor = require('../models/Doctor')

router.get('/', (req,res) => res.render('index'))
router.get('/get/doctorForm', async (req,res) => {
    const doctores = await Doctor.find()
    console.log(doctores);
    

    res.render('register/doctor', {doctores})
})
router.get('/get/employeesForm', (req,res) => res.render('register/employess'))


module.exports = router