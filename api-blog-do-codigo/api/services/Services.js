const database = require('../models')

class Services {
    constructor(model){
        this.model = model
    }

    async getAllService () {
        return database[this.model].findAll()
    }

    async getByIdService (id) {
        return database[this.model].findOne({ where: { id: Number(id) } })
    }

    async createService (dados) {
        return database[this.model].create(dados)
    }

    async updateService (dados, id) {
        return database[this.model].update(dados, { where: { id: Number(id) } })
    }

    async deleteService (id) {
        return database[this.model].destroy({ where: { id: Number(id) } })
    }
}

module.exports = Services