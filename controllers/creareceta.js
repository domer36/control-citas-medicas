const PDF =require("pdfkit");
const fs =require("fs");


exports.CrearPDF = (cita) => {


var doc=new PDF();

doc.pipe(fs.createWriteStream(`${__dirname}/../public/recetas/${cita._id}.pdf`));
const Medico=cita.doctor.nombre
const Especialidad=cita.especialidad.nombre
const Cedula=cita.doctor.cedula

doc.fontSize(8);
doc.text(`Nombre del Medico: ${Medico}
Especialidad: ${Especialidad}
Cedula Profecional: ${Cedula}`, {
  align: 'left'
});

doc.image(__dirname + "/../public/images/midoc_total.png",420,70,{width:100})

doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.text(`This text is justify.`, {
  width: 440,
  align: 'justify'
});


doc.rect(doc.x, 120, 450, doc.y).stroke();



return doc.end()

}