const PDF =require("pdfkit");
const fs =require("fs");


exports.CrearPDF = (cita) => {


  var doc=new PDF();

  doc.pipe(fs.createWriteStream(`${__dirname}/../public/recetas/${cita._id}.pdf`));
  const Paciente=cita.paciente.nombre
  const Medico=cita.doctor.nombre
  const Especialidad=cita.especialidad.nombre
  const Cedula=cita.doctor.cedula
  const Tratamiento=cita.tratamiento
  const Diagnostico=cita.diagnostico
  const Peso=cita.peso
  const Estatura=cita.estatura
  const Precion=cita.precion
  const fecha=new Date()

  doc.text(`Nombre del Paciente: ${Paciente}
Peso: ${Peso}   Estatura: ${Estatura}   
Preción: ${Precion}`, {
    width:350,
    align: 'left'
  });
  doc.text(`${fecha.getDate()}/ ${fecha.getMonth()+1}/ ${fecha.getFullYear()}`,0,60,{
    align: 'right'
  })
  doc.image(__dirname + "/../public/images/midoc_total.png",420,80,{width:100})
  doc.fontSize(10)
  doc.text(`Diagnostico:

${Diagnostico}`,75,135,{
    width:440,
    align:'justify'
  })
  doc.text(`Indicaciones Medicas:

${Tratamiento}`,75,330, {
    width: 440,
    align: 'justify'
  });
  doc.rect(70, 130, 450, 180).stroke();
  doc.rect(70, 320, 450, 180).stroke();
  doc.rect(70, 600, 450, 0).stroke();
  doc.fontSize(12)
  doc.text(`
  ${Medico}
  ${Especialidad}
  ${Cedula}`,75,600,{
    width:450,
    align:"center"
  })
  return doc.end()
}