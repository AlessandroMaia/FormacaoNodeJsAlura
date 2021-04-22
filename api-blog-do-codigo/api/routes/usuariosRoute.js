const { Router } = require('express')
const middlewareAuth = require('../services/middlewares-auth')
const UsuarioController = require('../controllers/UsuarioController')
const middlewareAutho = require('../services/middlewares-authorization')

const router = Router()

router.get('/usuarios', UsuarioController.getAll)
      .post('/usuarios', UsuarioController.create)
      .delete('/usuarios/:id', [middlewareAuth.bearer, middlewareAutho(['admin'])], UsuarioController.delete)

router.post('/usuarios/login', 
            middlewareAuth.local, 
            UsuarioController.login)

router.post('/usuarios/logout', 
            [middlewareAuth.refresh,
            middlewareAuth.bearer], 
            UsuarioController.logout)

router.post('/usuarios/atualiza_token', 
            middlewareAuth.refresh,
            UsuarioController.login)

router.get('/usuario/verifica_email/:token',
            middlewareAuth.verificacaoEmail,
            UsuarioController.verificaEmail)

module.exports = router