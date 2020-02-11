const { model, Schema } = require('mongoose')

const especialidadSchema = new Schema({
    nombre: String
})

module.exports = model('Especialidade', especialidadSchema)