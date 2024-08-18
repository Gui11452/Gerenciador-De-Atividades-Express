const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const PerfilSchema = new mongoose.Schema({
    email: {type: String, required: true},
    senha: {type: String, required: true},
});

const PerfilModel = mongoose.model('Perfil', PerfilSchema);

class Perfil{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){

        // Verificando se todos os campos foram preenchidos
        if(!this.body.emailLogin || !this.body.password){
            this.errors.push('Todos os campos são obrigatórios');
            return;
        }

        // Validando o e-mail
        if(!validator.isEmail(this.body.emailLogin)){
            this.errors.push('E-mail inválido.');
            return;
        }

        // Vendo se o e-mail existe na base de dados
        this.user = await PerfilModel.findOne({email: this.body.emailLogin});
        if (!this.user) {
            this.errors.push('Esse e-mail não está atrelado a nenhum usuário.');
            return;
        }

        // Verificando a senha
        if(!bcryptjs.compareSync(this.body.password, this.user.senha)) {
            this.errors.push('A senha enviada é inválida.');
            return;
        }

        return true;

    }

    async register(){
        await this.valida();

        // Vendo se o formulário tem algum erro
        if(this.errors.length > 0) return;

        // Fazendo um hashing na senha
        const salt = bcryptjs.genSaltSync();
        this.body.password1 = bcryptjs.hashSync(this.body.password1, salt);

        this.user = await PerfilModel.create({
            email: this.body.emailRegistro,
            senha: this.body.password1,
        });

    }

    // Validação do formulário
    async valida(){
        this.cleanUp();

        // Verificando se todos os campos foram preenchidos
        if(!this.body.emailRegistro || !this.body.password1 || !this.body.password2){
            this.errors.push('Todos os campos são obrigatórios');
        }

        // Validando o e-mail
        if(!validator.isEmail(this.body.emailRegistro)){
            this.errors.push('E-mail inválido.');
        }

        // Vendo se o e-mail já existe na base de dados
        const user = await PerfilModel.findOne({email: this.body.emailRegistro});
        if (user) this.errors.push('Esse e-mail já está atrelado a um usuário.');

        // As senhas devem ser iguais
        if(this.body.password1 != this.body.password2){
            this.errors.push('As senhas devem ser iguais');
        }

        // A senha deve ter entre 5 e 10 caracteres
        if(this.body.password1.length < 5 || this.body.password1.length > 10){
            this.errors.push('A senha deve ter entre 5 e 10 caracteres');
        }

    }

    // Limpando/Formatando os dados
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] != 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            emailRegistro: this.body.emailRegistro,
            password1: this.body.password1,
            password2: this.body.password2,
        }
    }
}

module.exports = Perfil;