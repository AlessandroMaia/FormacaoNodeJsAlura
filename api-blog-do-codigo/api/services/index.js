const UsuariosServices = require('./UsuariosServices')
const PostsServices = require('./PostsServices')
const AuthService = require('./AuthService')
const MiddlewareAuth = require('./middlewares-auth')

module.exports = {
    UsuariosServices: UsuariosServices, 
    PostsServices: PostsServices,
    AuthService: AuthService,
    MiddlewareAuth: MiddlewareAuth
}