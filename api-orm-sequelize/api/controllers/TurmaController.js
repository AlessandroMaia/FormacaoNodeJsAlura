const database = require("../models");
const Sequelize = require('sequelize');
const op = Sequelize.Op
class TurmaController {
  static async getAll(req, res) {
    const { data_inicial, data_final } = req.query
    const where = {}

    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[op.gte] = data_inicial : null
    data_final ? where.data_inicio[op.lte] = data_final : null

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const turma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async create(req, res) {
    const turma = req.body;
    try {
      const novaTurma = await database.Turmas.create(turma);
      return res.status(200).json(novaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const turma = req.body;
    try {
      await database.Turmas.update(turma, { where: { id: Number(id) } });
      const turmaAtualizado = await database.Turmas.findOne({
        where: { id: Number(id) }
      });
      return res.status(200).json(turmaAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        messagem: `id ${id} deletado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restore(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({ where: { id: Number(id) } });
      return res.status(200).json({
        messagem: `id ${id} restaurado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
