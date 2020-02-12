const transporter = require('../config/transporter')
const Cita = require('../models/Dates')

exports.SendMail = async (appoitment) => {
    const {fechaCita, paciente: {nombre: nombrePaciente, correo: correoPaciente}, doctor :{nombre: nombreDoctor}, especialidad: {nombre: nombreEspecialidad} } = await Cita.findById(appoitment._id).populate('doctor').populate('paciente').populate('especialidad')

    const bodyMail = `
        <b>Estimado(a): ${nombrePaciente.toUpperCase()}</b><br>
        Le informamos que su cita ha sido agendada con éxito, a continuación encontrará los detalles de la misma.
        <br>
        <b>Fecha</b>: ${fechaCita}<br>
        <b>Especialidad</b>: ${nombreEspecialidad}<br>
        <b>Médico</b>: ${nombreDoctor}<br>
    `
    await transporter.sendMail({
        from: '"no-replay " <info@midoctor.com>',
        to: `"${nombrePaciente.toUpperCase()}" <${correoPaciente}>`, 
        subject: 'Confirmación: Tu cita se agendó con éxito', 
        html: bodyMail
    })
}