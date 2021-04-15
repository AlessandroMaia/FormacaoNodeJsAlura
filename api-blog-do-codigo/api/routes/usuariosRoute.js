const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const router = Router()

router.get('/usuarios', UsuarioController.getAll)
      .post('/usuarios', UsuarioController.create)
      .delete('/usuarios/:id', UsuarioController.delete)

module.exports = router