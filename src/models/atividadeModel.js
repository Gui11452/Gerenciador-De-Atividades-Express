const mongoose = require('mongoose');

const AtividadeSchema = new mongoose.Schema({
    id_perfil: {type: String, required: true},
    titulo: {type: String, required: true},
    data: {type: Date, default: Date.now},
    horario: {type: String, required: true},
});

const AtividadeModel = mongoose.model('Atividade', AtividadeSchema);

module.exports = AtividadeModel;