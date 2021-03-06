function displayPage(url){
    document.querySelector('.content').innerHTML='<img style="position:absolute;margin-left:-128px; margin-top: -128px;left: 50%;top:50%;" src="/images/loading.gif"/>'
    axios.get(url).then( res=> document.querySelector('.content').innerHTML=res.data).catch(err => console.log(err))
}

function ObtenerDoctoresEspecialidad(e) {
    axios.get('/especialidad/'+e).then( doctors => {
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

function getCitaFormData(){
    const fechaCita = document.querySelector('input[name="cita_fechaCita"]').value
    const hora = document.querySelector('select[name="cita_hora"]').value
    const paciente = document.querySelector('select[name="cita_paciente"]').value
    const doctor = document.querySelector('select[name="cita_doctor"]').value
    const especialidad = document.querySelector('select[name="cita_especialidad"]').value

    return {
        fechaCita,
        hora,
        paciente,
        doctor,
        especialidad
        }
}

function getUsuarioFormData(){
    email = document.querySelector('input[name="email"]').value
    password = document.querySelector('input[name="password"]').value
    role = document.querySelector('select[name="role"]').value

    return { email,password, role }
}


async function GuardarAtenderCita(e){
    const id = document.querySelector('[name="atender_cita_id"]').value
    const diagnostico = document.querySelector('[name="atender_cita_diagnostico"]').value
    const tratamiento = document.querySelector('[name="atender_cita_tratamiento"]').value
    const peso = document.querySelector('[name="atender_cita_peso"]').value
    const estatura = document.querySelector('[name="atender_cita_estatura"]').value
    const precion = document.querySelector('[name="atender_cita_precion"]').value

    await axios.put('/guardardiagnostico/'+id, {
        diagnostico, tratamiento, peso, estatura, precion
    })
    Swal.fire({icon: 'success', text: 'Se guardó con éxito'})
    window.open(`/recetas/${id}.pdf`, '_blank')
    displayPage('/get/citasForm')
}

async function GuardarDoctor(){
    const id = document.querySelector('input[name="doctor_id"]').value
    if( id ) return EditarDoctor(id)

    await axios.post('/doctores', getDoctorFormData()).then(res => {
        $('#exampleModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/doctorForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
}

function EditarDoctor(id){
    axios.put('/doctores/'+id, getDoctorFormData()).then(res => {
        $('#exampleModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/doctorForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
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
    if( id ) return EditarRecepcionista(id);

    await axios.post('/recepcionista', getRecepcionistaFormData()).then(res => {
        $('#recepcionistaModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/recepcionistaForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
}

function EditarRecepcionista(id){
    axios.put('/recepcionista/'+id, getRecepcionistaFormData()).then(res => {
        $('#recepcionistaModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/recepcionistaForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
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
    axios.get(url)
    .then(({data}) => {        
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

    await axios.post('/patient', getPacienteFormData()).then(res => {
        $('#pacienteModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/pacienteForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err =>console.log(err))
}

function EditarPaciente(id){
    axios.put('/patient/'+id, getPacienteFormData()).then(res => {
        $('#pacienteModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/pacienteForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
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
    axios.get(url)
    .then(({data}) => {
        
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



















async function GuardarCita(){
    const id = document.querySelector('input[name="cita_id"]').value
    if( id ) return EditarCita(id)

    await axios.post('/dates', getCitaFormData()).then(res => {
        $('#citasModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/citasForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
}

function EditarCita(id){
    axios.put('/dates/'+id, getCitaFormData()).then(res => {
        $('#citasModal').modal('hide')
        if( res.data.status === 'done') {
            Swal.fire({ icon: 'success', text: 'Se guardó con éxito' })
            displayPage('/get/citasForm')
        }
        else if( res.data.status === 'error') Swal.fire({ icon: 'error', text: res.data.message })
    }).catch(err => console.log(err))
}



function EliminarCita(id){
    Swal.fire({
        title: 'Estas seguro que deseas eliminar la cita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete('/dates/'+id)
            Swal.fire(
              'Eliminado!',
              'Se eliminó con éxito.',
              'success'
            )
            displayPage('/get/citasForm')
        }
      })




}

function ShowCita(id){
    const url = `/dates/${id}`
    axios.get(url)
    .then(({data}) => {
        
        if( data._id ){
            ObtenerDoctoresEspecialidad(data.especialidad._id)
            document.querySelector('input[name="cita_id"]').value = data._id
            document.querySelector('input[name="cita_fechaCita"]').value = data.fechaCita
            document.querySelector('select[name="cita_hora"]').value = data.hora
            document.querySelector('select[name="cita_paciente"]').value = data.paciente._id
            document.querySelector('select[name="cita_doctor"]').value = data.doctor._id
            document.querySelector('select[name="cita_especialidad"]').value = data.especialidad._id
        }else{
            Swal.fire({icon: 'error', text:' No se encontró la cita'})
        }
    })
    .catch(err => console.log(err))
}


async function GuardarUsuario(){
    id = document.querySelector('input[name="usuario_id"]').value
    if(id) return ActualizarUsuario(id)

    const {data} = await axios.post('/signup', getUsuarioFormData())
    $('#usuarioModal').modal('hide')
    if( data.status === 'done' ){
        Swal.fire({icon: 'success', text: 'El usuario se guardó con éxito'})
        displayPage('/get/usuariosForm')
    }else{
        Swal.fire({icon: 'error', text: data.message})
    }

}

async function ActualizarUsuario(id){
    const {data} = await axios.put('/user/'+id, getUsuarioFormData())
    $('#usuarioModal').modal('hide')
    if( data.status === 'done' ){
        Swal.fire({icon: 'success', text: 'El usuario se guardó con éxito'})
        displayPage('/get/usuariosForm')
    }else{
        Swal.fire({icon: 'error', text: data.message})
    }

}

async function EliminarUsuario(id){
    Swal.fire({
        title: 'Estas seguro que deseas eliminar usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.value) {
            await axios.delete('/user/'+id)
            Swal.fire(
              'Eliminado!',
              'Se eliminó con éxito.',
              'success'
            )
            displayPage('/get/usuariosForm')
        }
      })
}



async function ShowUsuario(id){
    const {data} = await axios.get('/user/'+ id)
    document.querySelector('input[name="usuario_id"]').value = data._id
    document.querySelector('input[name="email"]').value = data.email
    document.querySelector('select[name="role"]').value = data.role    
}

displayPage('/get/citasForm')