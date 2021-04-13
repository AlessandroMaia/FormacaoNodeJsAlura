const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async getAllService() {
    return database[this.nomeDoModelo].findAll();
  }

  async getByIdService(id) {
    return database[this.nomeDoModelo].findOne({ where: { id: Number(id) } });
  }

  async createService(dados) {}

  async updateService(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { id: id },
      transacao
    });
  }

  async updatesService(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { ...where },
      transacao
    });
  }

  async deleteService(id) {}
}

module.exports = Services;
