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
        $('#exampleModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/doctorForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => {
        console.log(err)
    })
}

function EditarDoctor(id){
    axios.put('/doctores/'+id, getDoctorFormData())
}
function EliminarDoctor(id, name){
    Swal.fire({
        title: 'Estas seguro que deseas eliminar?',
        text: "Doctor: "+name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete('/doctores/'+id)
            Swal.fire(
              'Eliminado!',
              'Se eliminó con éxito.',
              'success'
            )
            displayPage('/get/doctorForm')
        }
      })




}

function ShowDoctor(id){
    axios.get('/doctores/'+id)
    .then(data => console.log(data.data))
    .catch(err => console.log(err))
}