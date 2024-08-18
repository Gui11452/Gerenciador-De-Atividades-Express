const AtividadeModel = require('../models/atividadeModel');

function formataData(data){
    let dia = zeroAEsquerda(data.getDate())
    let mes = zeroAEsquerda( data.getMonth() + 1)
    let ano = zeroAEsquerda(data.getFullYear())
    let hora = zeroAEsquerda(data.getHours())
    let minuto = zeroAEsquerda(data.getMinutes())
    let segundo = zeroAEsquerda(data.getSeconds())
    //return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`
    return `${dia}/${mes}/${ano}`
}

function zeroAEsquerda(valor){
     valor = valor < 10 ? '0' + valor : valor
     return valor
}

exports.paginaInicial = async (req, res, next) => {
    try{
        const atividades = await AtividadeModel.find({id_perfil: req.session.user._id,});
        res.render('index', {
            'atividades': atividades,
            'formataData': formataData,
            'title': 'Projeto Agenda',
            'css': `index.css`,
            'js': `index.bundle.js`,
        });

    } catch(e){
        return res.send(`error: ${e} - HTTP ERROR 404`);
    }
};

exports.atividade = async (req, res, next) => {
    try{
        if(!req.params.id_atv){
            return res.redirect('/');
        }

        const atividade = await AtividadeModel.findById(req.params.id_atv);
        res.render('atividade', {
            'atividade': atividade,
            'formataData': formataData,
            'title': 'Projeto Agenda',
            'css': `index.css`,
            'js': `index.bundle.js`,
        });

    } catch(e){
        return res.send(`error: ${e} - HTTP ERROR 404`);
    }
};


exports.addAtv = async (req, res, next) => {
    try{
        if(!req.body.titulo || !req.body.data || !req.body.horario){
            req.flash('errors', 'Os campos abaixo são obrigatórios, não podem ficar em branco.');
            req.session.save(function(){
                return res.redirect('/');
            });
        }

        await AtividadeModel.create({
            id_perfil: req.session.user._id,
            titulo: req.body.titulo,
            data: req.body.data,
            horario: req.body.horario,
        });

        req.flash('success', 'A sua atividade foi cadastrada com sucesso.');
        req.session.save(function(){
            return res.redirect('/');
        });

    } catch(e){
        return res.send(`error: ${e} - HTTP ERROR 404`);
    }
}; 

exports.editAtv = async (req, res, next) => {
    try{
        if(!req.body.titulo || !req.body.data || !req.body.horario || !req.body.id_atv){
            req.flash('errors', 'Os campos abaixo são obrigatórios, não podem ficar em branco.');
            req.session.save(function(){
                return res.redirect('/');
            });
        }

        const backURL = req.header('Referer') || '/';

        const atividade = await AtividadeModel.findByIdAndUpdate(
            req.body.id_atv,
            {
            titulo: req.body.titulo,
            data: req.body.data,
            horario: req.body.horario,
            },
            {
                new: true,
            },
        );

        if(!atividade){
            req.flash('errors', 'A atividade que você está tentando editar NÃO existe.');
            req.session.save(function(){
                return res.redirect(backURL);
            });
        }

        req.flash('success', 'A sua atividade foi editada com sucesso.');
        req.session.save(function(){
            return res.redirect(backURL);
        });

    } catch(e){
        return res.send(`error: ${e} - HTTP ERROR 404`);
    }
};

exports.removeAtv = async (req, res, next) => {
    try{
        if(!req.body.id_atv){
            return res.redirect('/');
        }

        //const atividade = await AtividadeModel.findOne({_id: req.body.id_atv});
        const atividade = await AtividadeModel.findById(req.body.id_atv);

        if(!atividade){
            req.flash('errors', 'Essa atividade NÃO existe.');
            req.session.save(function(){
                return res.redirect('/');
            });
        }
        await atividade.deleteOne();

        req.flash('success', `A atividade "${atividade.titulo}" foi excluida.`);
        req.session.save(function(){
            return res.redirect('/');
        });


    } catch(e) {
        return res.send(`error: ${e} - HTTP ERROR 404`);
    }
};
