const router = require('express').Router()

router.get('/', (req,res) => res.render('index'))
router.get('/get/doctorForm', (req,res) => res.render('register/doctor'))
router.get('/get/employeesForm', (req,res) => res.render('register/employess'))


module.exports = router