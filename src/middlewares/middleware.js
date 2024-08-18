exports.middlewareGlobal = (req, res, next) => {
    res.locals.assets = `${req.protocol}://${req.get('host')}/assets`;
    res.locals.host = `${req.protocol}://${req.get('host')}`;

    // Flash Messages Capture Front End
    res.locals.errors = req.flash('errors');
    res.locals.infos = req.flash('infos');
    res.locals.success = req.flash('success');

    // Login
    res.locals.user = req.session.user;
    
    next();
};

exports.loginRequired = (req, res, next) => {
	if(!req.session.user){
		req.flash('errors', 'Você precisa estar online para acessar essa área');
		req.session.save(function(){
			res.redirect('/loginregistro');
		});
		return;
	}

	next();
};

exports.checkCSRFError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.send('BAD CSRF');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}