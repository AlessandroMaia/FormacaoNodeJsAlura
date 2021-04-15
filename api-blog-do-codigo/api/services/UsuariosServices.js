const database = require('../models')
const Services = require('./Services')
const bcrypt = require('bcrypt')

class UsuariosServices extends Services {
    constructor() {
        super('usuarios')
    }

    async getByEmail (email) {
        const usuario = await database[this.model].findOne({where: { email: email }})
        if (!usuario){
            return null
        }

        return usuario
    }

    async createService (dados) {
        if (await this.getByEmail(dados.email)) {
            throw new Error('Usuário já existe')
        }
        
        let senha = await UsuariosServices.gerarSenhaHash(dados.senhaHash)
        dados.senhaHash = senha

        return database[this.model].create(dados)
    }

    static gerarSenhaHash (senha) {
        const custoHash = 12
        return bcrypt.hash(senha, custoHash)
    }
}

module.exports = UsuariosServices