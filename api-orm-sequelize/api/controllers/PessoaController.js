const Sequelize = require("sequelize");
const database = require("../models");

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {
  static async getAllAticves(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.getAllActivesService();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.getAllService();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await pessoasServices.getByIdService(id);
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
      await database.Pessoas.scope("all").update(pessoa, {
        where: { id: Number(id) },
      });
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

  static async desactivatePessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasServices.desactivatePessoaAndMatriculasService(Number(estudanteId))
      return res
        .status(200)
        .json({ message: `matrículas ref. ${estudanteId} canceladas` });
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
      return res.status(500).json(error.matricula);
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
      return res.status(500).json(error.mensage);
    }
  }

  static async getAllMatriculaConfirmadaByIdPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async getAllMatriculaByTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
        limit: 20,
        order: [["estudante_id", "DESC"]],
      });
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }

  static async getAllMatriculaByTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.mensage);
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
        where: { id: Number(idMatricula), estudante_id: Number(idPessoa) },
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
      await database.Matriculas.restore({
        id: Number(idMatricula),
        estudante_id: Number(idPessoa),
      });
      return res.status(200).json({
        messagem: `id ${idMatricula} restaurado!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
