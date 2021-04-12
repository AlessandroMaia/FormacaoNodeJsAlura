const database = require("../models");

class NivelController {
  static async getAll(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const nivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async create(req, res) {
    const nivel = req.body;
    try {
      const novoNivel = await database.Niveis.create(nivel);
      return res.status(200).json(novoNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const nivel = req.body;
    try {
      await database.Niveis.update(nivel, { where: { id: Number(id) } });
      const nivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) }
      });
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        messagem: `id ${id} deletado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
