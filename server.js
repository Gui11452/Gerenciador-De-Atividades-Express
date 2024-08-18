require('dotenv').config();

// Importações
const express = require('express');
const routes = require('./routes');
const path = require('path');
const middlewares = require('./src/middlewares/middleware');

// Iniciando o app
const app = express();

// Configuração Helmet
const helmet = require('helmet');
app.use(helmet());

// Configuração CSRF
const csrf = require('csurf');

// Conexão com o banco de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
	.then(() => {
		console.log('Conectei ao banco de dados, agora, você pode rodar a aplicação');
		app.emit('pronto');
    })
	.catch((e) => {
		console.log(e);
	});

// Configuração da session e flash messages
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const sessionOptions = session({
	secret: process.env.STRINGSECURITYSESSION,
	store: MongoStore.create({
		mongoUrl: process.env.CONNECTIONSTRING,
		ttl: 7 * 24 * 60 * 60 // 7 dias de expiração
	}),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60* 24 * 7,
		httpOnly: true,
		// secure: true, // Use true se estiver usando HTTPS
		// sameSite: 'strict', // Para proteger contra CSRF
	}
});

app.use(sessionOptions);
app.use(flash());

// Permite usar o corpo da requisição POST e PUT no backend, com req.body
app.use(express.urlencoded({
	extended: true,
}))

// Configuração dos views/templates
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Configuração dos arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(csrf());
// Nossos middlewares abaixo
app.use(middlewares.middlewareGlobal);
app.use(middlewares.checkCSRFError);
app.use(middlewares.csrfMiddleware);
app.use(routes); // Configuração das rotas

// Configuração de que porta o servidor vai ouvir
app.on('pronto', () => {
	app.listen(3000, () => {
		console.log('Acessar: http://127.0.0.1:3000');
		console.log('Servidor executando na porta 3000!');
	});
});