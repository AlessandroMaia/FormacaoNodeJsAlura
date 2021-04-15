const posts = require('./postsRoute')
const usuarios = require('./usuariosRoute')
const bodyParser = require('body-parser')

module.exports = app => {
    app.use(bodyParser.json(),
    posts,
    usuarios)
}