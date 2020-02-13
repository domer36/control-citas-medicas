const PDF =require("pdfkit");
const fs =require("fs");

var doc=new PDF();

doc.pipe(fs.createWriteStream(__dirname + "/example.pdf"));
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';
const Medico="Santiago Alfredo González Mancilla" 
const Especialidad="Medico Partero"
const Cedula="wsedrftgyhujiuhgvfr"

doc.fontSize(8);
doc.text(`Nombre del Medico: ${Medico}
Especialidad: ${Especialidad}
Cedula Profecional: ${Cedula}`, {
  align: 'left'
});

doc.image("../public/images/midoc_total.png",420,70,{width:100})

doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.text(`This text is justify. ${lorem}`, {
  width: 440,
  align: 'justify'
});


doc.rect(doc.x, 120, 450, doc.y).stroke();



doc.end();