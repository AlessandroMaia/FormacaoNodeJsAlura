const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  async getAllActivesService(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async getAllService(where = {}) {
    return database[this.nomeDoModelo]
      .scope("all")
      .findAll({ where: { ...where } });
  }

  async desactivatePessoaAndMatriculasService(estudanteId) {
    return database.sequelize.transaction(async (t) => {
      await super.updateService({ ativo: false }, 
        estudanteId, 
        {transaction: t});
      await this.matriculas.updatesService(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        { transaction: t }
      );
    });
  }
}

module.exports = PessoasServices;
