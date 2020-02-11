function displayPage(url){
    axios.get(url).then( res=> document.querySelector('.content').innerHTML=res.data).catch(err => console.log(err))
}

function ObtenerDoctoresEspecialidad(e) {
    console.log(e.value)
    axios.get('/especialidad/'+e.value).then( doctors => {
        const select = document.querySelector('select[name="cita_doctor"]')
        select.innerHTML = ''
        doctors.data.forEach( doctor => {
            const option = document.createElement('option')
            option.value = doctor._id
            option.innerText = doctor.nombre
            select.appendChild(option)
        })
    })
}

function getDoctorFormData(){
    const doctor_name = document.querySelector('input[name="doctor_name"]').value
    const doctor_cedula = document.querySelector('input[name="doctor_cedula"]').value
    const doctor_especialidad = document.querySelector('[name="doctor_especialidad"]').value
    const doctor_email = document.querySelector('input[name="doctor_email"]').value

    return {
            doctor_name,
            doctor_cedula,
            doctor_especialidad,
            doctor_email
        }
}

function getRecepcionistaFormData(){
    const recepcionista_name = document.querySelector('input[name="recepcionista_name"]').value
    const recepcionista_correo = document.querySelector('input[name="recepcionista_correo"]').value

    return {
            recepcionista_name,
            recepcionista_correo
        }
}


function getPacienteFormData(){
const patient_name = document.querySelector('input[name="patient_name"]').value
const patient_curp = document.querySelector('input[name="patient_curp"]').value
const patient_fechaNacimiento = document.querySelector('input[name="patient_fechaNacimiento"]').value
const patient_telefono = document.querySelector('input[name="patient_telefono"]').value
const patient_direccion = document.querySelector('input[name="patient_direccion"]').value
const patient_tipoSangre = document.querySelector('input[name="patient_tipoSangre"]').value
const patient_estadoCivil = document.querySelector('input[name="patient_estadoCivil"]').value
const patient_correo = document.querySelector('input[name="patient_correo"]').value

return {
    patient_name,
    patient_curp,
    patient_fechaNacimiento,
    patient_telefono,
    patient_direccion,
    patient_tipoSangre,
    patient_estadoCivil,
    patient_correo
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
            document.querySelector('[name="doctor_especialidad"]').value = data.especialidad._id
            document.querySelector('input[name="doctor_email"]').value = data.correo
        }else{
            Swal.fire({icon: 'error', text:' No se encontró el doctor'})
        }
    })
    .catch(err => console.log(err))
}



async function GuardarRecepcionista(){
    const id = document.querySelector('input[name="recepcionista_id"]').value
    if( id ) return EditarRecepcionista(id)
console.log( getRecepcionistaFormData() );

    await axios.post('/recepcionista', getRecepcionistaFormData()).then(res => {
        console.log(res.data.message)
        $('#recepcionistaModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/recepcionistaForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => {
        console.log(err)
    })
}

function EditarRecepcionista(id){
    axios.put('/recepcionista/'+id, getRecepcionistaFormData()).then(res => {
        console.log(res.data.message)
        $('#recepcionistaModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/recepcionistaForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => {
        console.log(err)
    })
}



function EliminarRecepcionista(id, name){
    Swal.fire({
        title: 'Estas seguro que deseas eliminar?',
        text: "Recepcionista: "+name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete('/recepcionista/'+id)
            Swal.fire(
              'Eliminado!',
              'Se eliminó con éxito.',
              'success'
            )
            displayPage('/get/recepcionistaForm')
        }
      })




}

function ShowRecepcionista(id){
    const url = `/recepcionista/${id}`
    console.log(url)
    axios.get(url)
    .then(({data}) => {
        console.log(data);
        
        if( data._id ){
            document.querySelector('input[name="recepcionista_id"]').value = data._id
            document.querySelector('input[name="recepcionista_name"]').value = data.nombre
            document.querySelector('input[name="recepcionista_correo"]').value = data.correo
        }else{
            Swal.fire({icon: 'error', text:' No se encontró el asistente'})
        }
    })
    .catch(err => console.log(err))
}


















async function GuardarPaciente(){
    const id = document.querySelector('input[name="patient_id"]').value
    if( id ) return EditarPaciente(id)
console.log( 'getting', getPacienteFormData() );

    await axios.post('/patient', getPacienteFormData()).then(res => {
        console.log(res.data.message)
        $('#pacienteModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/pacienteForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => {
        console.log(err)
    })
}

function EditarPaciente(id){
    axios.put('/patient/'+id, getPacienteFormData()).then(res => {
        console.log(res.data.message)
        $('#pacienteModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/pacienteForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => {
        console.log(err)
    })
}



function EliminarPaciente(id, name){
    Swal.fire({
        title: 'Estas seguro que deseas eliminar?',
        text: "Paciente: "+name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete('/patient/'+id)
            Swal.fire(
              'Eliminado!',
              'Se eliminó con éxito.',
              'success'
            )
            displayPage('/get/pacienteForm')
        }
      })




}

function ShowPaciente(id){
    const url = `/patient/${id}`
    console.log(url)
    axios.get(url)
    .then(({data}) => {
        console.log(data);
        
        if( data._id ){
            document.querySelector('input[name="patient_id"]').value = data._id
            document.querySelector('input[name="patient_name"]').value = data.nombre
            document.querySelector('input[name="patient_curp"]').value = data.curp
            document.querySelector('input[name="patient_fechaNacimiento"]').value = data.fechaNacimiento.split('T')[0]
            document.querySelector('input[name="patient_telefono"]').value = data.telefono
            document.querySelector('input[name="patient_direccion"]').value = data.direccion
            document.querySelector('input[name="patient_tipoSangre"]').value = data.tipoSangre
            document.querySelector('input[name="patient_estadoCivil"]').value = data.estadoCivil
            document.querySelector('input[name="patient_correo"]').value = data.correo
        
        }else{
            Swal.fire({icon: 'error', text:' No se encontró el paciente'})
        }
    })
    .catch(err => console.log(err))
}