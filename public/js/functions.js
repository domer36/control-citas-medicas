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
    const id = document.querySelector('input[name="doctor_id"]').value
    if( id ) return EditarDoctor(id)

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
    axios.put('/doctores/'+id, getDoctorFormData()).then(res => {
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
    const url = `/doctores/${id}`
    console.log(url)
    axios.get(url)
    .then(({data}) => {
        if( data._id ){
            document.querySelector('input[name="doctor_id"]').value = data._id
            document.querySelector('input[name="doctor_name"]').value = data.nombre
            document.querySelector('input[name="doctor_cedula"]').value = data.cedula
            document.querySelector('input[name="doctor_especialidad"]').value = data.especialidad
            document.querySelector('input[name="doctor_email"]').value = data.correo
        }else{
            Swal.fire({icon: 'error', text:' No se encontró el doctor'})
        }
    })
    .catch(err => console.log(err))
}