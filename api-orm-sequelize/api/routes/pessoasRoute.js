const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get('/pessoas', PessoaController.getAllAticves)
router.get('/pessoas/todos', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getById)
router.post('/pessoas', PessoaController.create)
router.post('/pessoas/:estudanteId/cancela', PessoaController.deactivatePessoa)
router.put('/pessoas/:id', PessoaController.update)
router.delete('/pessoas/:id', PessoaController.delete)
router.post('/pessoas/:id/restaura', PessoaController.restore)

router.get('/pessoas/:idPessoa/matricula/:idMatricula', PessoaController.getMatriculaById)
router.get('/pessoas/:estudanteId/matricula', PessoaController.getAllMatriculaByIdPessoa)
router.get('/pessoas/:estudanteId/matricula_confirmada', PessoaController.getAllMatriculaConfirmadaByIdPessoa)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.getAllMatriculaByTurma)
router.get('/pessoas/matricula/lotada', PessoaController.getAllMatriculaByTurmasLotadas)
router.post('/pessoas/:pessoaId/matricula', PessoaController.createMatricula)
router.put('/pessoas/:idPessoa/matricula/:idMatricula', PessoaController.updateMatricula)
router.delete('/pessoas/:idPessoa/matricula/:idMatricula', PessoaController.deleteMatricula)
router.post('/pessoas/:idPessoa/matricula/:idMatricula/restaura', PessoaController.restoreMatricula)

module.exports = router