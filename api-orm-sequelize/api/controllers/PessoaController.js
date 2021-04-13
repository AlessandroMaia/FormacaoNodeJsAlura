const database = require("../models");

class PessoaController {
  static async getAll(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoa = await database.Pessoas.create(pessoa);
      return res.status(200).json(novaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const pessoa = req.body;
    try {
      await database.Pessoas.update(pessoa, { where: { id: Number(id) } });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } });
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
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res.status(200).json({
        messagem: `id ${id} restaurado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getMatriculaById(req, res) {
    const { idPessoa } = req.params;
    const { idMatricula } = req.params;

    try {
      const matricula = await database.Matriculas.findOne({
        where: { id: Number(idMatricula), estudante_id: Number(idPessoa) },
      });
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(200).json(error.matricula);
    }
  }

  static async getAllMatriculaByIdPessoa(req, res) {
    const { estudanteId } = req.params;

    try {
      const matriculas = await database.Matriculas.findAll({
        where: { estudante_id: Number(estudanteId) },
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(200).json(error.mensage);
    }
  }

  static async createMatricula(req, res) {
    const { pessoaId } = req.params;
    const matricula = { ...req.body, estudante_id: Number(pessoaId) };
    try {
      const novamatricula = await database.Matriculas.create(matricula);
      return res.status(200).json(novamatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateMatricula(req, res) {
    const { idPessoa } = req.params;
    const { idMatricula } = req.params;
    const pessoa = req.body;
    try {
      await database.Matriculas.update(pessoa, {
        where: { id: Number(idMatricula), estudante_id: Number(idPessoa) },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(idMatricula), estudante_id: Number(idPessoa) },
      });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteMatricula(req, res) {
    const { idPessoa } = req.params;
    const { idMatricula } = req.params;
    try {
      await database.Matriculas.destroy({
        where: { id: Number(idMatricula), estudante_id: Number(idPessoa) }
      });
      return res.status(200).json({
        messagem: `id ${idMatricula} deletado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreMatricula(req, res) {
    const { idPessoa } = req.params;
    const { idMatricula } = req.params;
    try {
      await database.Matriculas.restore({ id: Number(idMatricula), estudante_id: Number(idPessoa) });
      return res.status(200).json({
        messagem: `id ${idMatricula} restaurado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
