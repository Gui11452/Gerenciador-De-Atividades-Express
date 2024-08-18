const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginregistroController = require('./src/controllers/loginregistroController');
const {loginRequired} = require('./src/middlewares/middleware.js');

// Rotas da Home
route.get('/', loginRequired, homeController.paginaInicial);
route.get('/atividade/:id_atv', loginRequired, homeController.atividade);
route.post('/add_atv', loginRequired, homeController.addAtv);
route.post('/edit_atv', loginRequired, homeController.editAtv);
route.post('/remove_atv', loginRequired, homeController.removeAtv);

// Rotas de Login
route.get('/loginregistro', loginregistroController.loginregistro);
route.post('/login', loginregistroController.login);
route.post('/registro', loginregistroController.registro);
route.post('/logout', loginregistroController.logout);

module.exports = route;