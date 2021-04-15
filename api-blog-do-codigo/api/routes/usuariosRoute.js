const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const passport = require('passport')

const router = Router()

router.get('/usuarios', UsuarioController.getAll)
      .post('/usuarios', UsuarioController.create)
      .delete('/usuarios/:id', UsuarioController.delete)

router.post('/usuarios/login', 
            passport.authenticate('local', { session: false }), 
            UsuarioController.login)

module.exports = router