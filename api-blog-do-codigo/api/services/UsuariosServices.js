const database = require('../models')
const Services = require('./Services')

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

        return database[this.model].create(dados)
    }
}

module.exports = UsuariosServices