function displayPage(url){
    axios.get(url).then( res=> document.querySelector('.content').innerHTML=res.data).catch(err => console.log(err))
}

function getDoctorFormData(){
    const doctor_name = document.querySelector('input[name="doctor_name"]').value
    const doctor_cedula = document.querySelector('input[name="doctor_cedula"]').value
    const doctor_especialidad = document.querySelector('input[name="doctor_especialidad"]').value
    const doctor_email = document.querySelector('input[name="doctor_email"]').value

    return {
            doctor_name,
            doctor_cedula,
            doctor_especialidad,
            doctor_email
        }
}


async function GuardarDoctor(){
    await axios.post('/doctores', getDoctorFormData()).then(res => {
        console.log(res.data.message)
    }).catch(err => {
        console.log(err)
    })
    displayPage('/get/doctorForm')
}

function EditarDoctor(id){
    axios.put('/doctores/'+id, getDoctorFormData())
}
async function EliminarDoctor(id){
    await axios.delete('/doctores/'+id)
    displayPage('/get/doctorForm')
}

function ShowDoctor(id){
    axios.get('/doctores/'+id)
    .then(data => console.log(data.data))
    .catch(err => console.log(err))
}