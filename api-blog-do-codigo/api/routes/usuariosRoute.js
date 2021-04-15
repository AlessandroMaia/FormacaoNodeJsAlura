const { Router } = require('express')
const middlewareAuth = require('../services/middlewares-auth')
const UsuarioController = require('../controllers/UsuarioController')

const router = Router()

router.get('/usuarios', UsuarioController.getAll)
      .post('/usuarios', UsuarioController.create)
      .delete('/usuarios/:id', middlewareAuth.bearer, UsuarioController.delete)

router.post('/usuarios/login', 
            middlewareAuth.local, 
            UsuarioController.login)

module.exports = router