
function GuardarDoctor(){
    const doctor_name = document.querySelector('input[name="doctor_name"]').value
    const doctor_cedula = document.querySelector('input[name="doctor_cedula"]').value
    const doctor_especialidad = document.querySelector('input[name="doctor_especialidad"]').value
    const doctor_email = document.querySelector('input[name="doctor_email"]').value


    console.log({
        doctor_name,
doctor_cedula,
doctor_especialidad,
doctor_email
    })

    axios.post('/doctores', {
        doctor_name,
doctor_cedula,
doctor_especialidad,
doctor_email
    }).then(res => alert(res.data.message)).catch(err => console.log(err))
}