const transporter = require('../config/transporter')
const Cita = require('../models/Dates')

exports.SendMail = async (appoitment) => {
    const {fechaCita, paciente: {nombre: nombrePaciente, correo: correoPaciente}, doctor :{nombre: nombreDoctor}, especialidad: {nombre: nombreEspecialidad} } = await Cita.findById(appoitment._id).populate('doctor').populate('paciente').populate('especialidad')

    // const bodyMail = `
    //     <b>Estimado(a): ${nombrePaciente.toUpperCase()}</b><br>
    //     Le informamos que su cita ha sido agendada con éxito, a continuación encontrará los detalles de la misma.
    //     <br>
    //     <b>Fecha</b>: ${fechaCita}<br>
    //     <b>Especialidad</b>: ${nombreEspecialidad}<br>
    //     <b>Médico</b>: ${nombreDoctor}<br>
    // `

    const bodyMail = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <div class="card">
      <div class="card-header">
        <img src="https://consultas-medicas.herokuapp.com/images/midoc_total.png" class="img-fluid" alt="Responsive image">
      </div>
      <div class="card-body">
        <h5 class="card-title">Estimado(a): ${nombrePaciente.toUpperCase()}</h5>
        <p class="card-text">Le informamos que su cita ha sido agendada con éxito, a continuación encontrará los detalles de la misma.</p>
        <br>
        <b>Fecha</b>: ${fechaCita}<br>
        <b>Especialidad</b>: ${nombreEspecialidad}<br>
        <b>Médico</b>: ${nombreDoctor}<br>
    
      </div>
    </div>
    `
    return await transporter.sendMail({
        from: '"no-replay " <info@midoctor.com>',
        to: `"${nombrePaciente.toUpperCase()}" <${correoPaciente}>`, 
        subject: 'Confirmación: Tu cita se agendó con éxito', 
        html: bodyMail
    }).catch( err => console.log(err) )
}