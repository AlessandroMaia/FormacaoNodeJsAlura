const { Router } = require('express')
const PostController = require('../controllers/PostController')

const router = Router()

router.get('/posts', PostController.getAll)
      .post('/posts', PostController.create)

module.exports = router