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


function GuardarDoctor(){
    

    axios.post('/doctores', getDoctorFormData()).then(res => alert(res.data.message)).catch(err => console.log(err))
}

function EditarDoctor(id){
    axios.put('/doctores/'+id, getDoctorFormData())
}
function EliminarDoctor(id){
    axios.put('/doctores/'+id)
}

function ShowDoctor(id){
    axios.get('/doctores/'+id)
    .then(data => console.log(data.data))
    .catch(err => console.log(err))
}