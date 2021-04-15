const { Router } = require('express')
const PostController = require('../controllers/PostController')
const middlewareAuth = require('../services/middlewares-auth')

const router = Router()

router.get('/posts', PostController.getAll)
      .post('/posts', middlewareAuth.bearer,  PostController.create)

module.exports = router