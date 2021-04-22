const { AccessControlError } = require('accesscontrol')
const AccessControl = require('accesscontrol')
const control = new AccessControl()

control.grant('assinante').readAny('posts', ['id', 'titulo', 'conteudo', 'autor'])
control.grant('editor').extend('assinante').createOwn('post').deleteOwn('post')
control.grant('admin').createAny('post').deleteAny('post').readAny('usuario').deleteAny('usuario')

module.exports = control