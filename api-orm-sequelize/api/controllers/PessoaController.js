const database = require("../models");

class PessoaController {
  static async getAll(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
        res.status(500)
            .json(error.message)
    }
  }
}

module.exports =  PessoaController
