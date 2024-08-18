const Perfil = require('../models/perfilModel');

exports.loginregistro = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }

    res.render('loginregistro', {
        'title': 'Login e Registro',
        'css': `loginregistro.css`,
        'js': `loginregistro.bundle.js`,
    });
}

exports.login = async (req, res, next) => {
    try{
        if(req.session.user){
            return res.redirect('/');
        }

        let urlRedirect;

        const login = new Perfil(req.body);
        const statusLogin = await login.login();

        if(!statusLogin && login.errors.length > 0){
            req.flash('errors', login.errors);
            urlRedirect = req.header('Referer') || '/loginregistro';
        }
        else if(statusLogin && login.errors.length <= 0 && login.user){
            req.flash('success', 'O seu login foi feito com sucesso.');
            urlRedirect = '/';

            // Fazendo login do usuário
            req.session.user = login.user;

        } else{
            req.flash('errors', 'O seu login não foi válido.');
            urlRedirect = req.header('Referer') || '/loginregistro';
        };

        req.session.save(function(){
            return res.redirect(urlRedirect);
            //return res.redirect('back');
        });
        return;
        
    } catch(e){
        res.send(`error: ${e} - HTTP ERROR 404`);
        console.error('Error message:', e.message); // Mensagem do erro
        console.error('Stack trace:', e.stack); // Stack trace (rastreamento da pilha de chamadas)
        console.error('Error name:', e.name); // Nome do erro (por exemplo, 'TypeError')
    }
}

exports.registro = async (req, res, next) => {
    try{
        if(req.session.user){
            return res.redirect('/');
        }

        const backURL = req.header('Referer') || '/loginregistro';

        const login = new Perfil(req.body);
        await login.register();

        if(login.errors.length > 0 && !login.user){
            req.flash('errors', login.errors);
        }
        else if(login.errors.length <= 0 && login.user){
            req.flash('success', 'O seu cadastro foi feito com sucesso. Agora, faça login.');
        } else{
            req.flash('errors', 'O seu registro não foi válido.');
        };

        req.session.save(function(){
            return res.redirect(backURL);
            //return res.redirect('back');
        })
        return;
        
    } catch(e){
        res.send(`error: ${e} - HTTP ERROR 404`);
        console.error('Error message:', e.message); // Mensagem do erro
        console.error('Stack trace:', e.stack); // Stack trace (rastreamento da pilha de chamadas)
        console.error('Error name:', e.name); // Nome do erro (por exemplo, 'TypeError')
    }
}

exports.logout = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/loginregistro');
    }

    // Destruindo a sessão
    req.session.destroy();

    return res.redirect('/loginregistro');
};