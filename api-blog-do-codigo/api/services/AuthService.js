const passaport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UsuariosServices = require('../services/UsuariosServices')
const Usuario = new UsuariosServices()

const bcrypt = require('bcrypt')

function verificaUsuario (usuario) {
    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }
}

async function verificaSenha (senha, senhaHash) {
    const valida = await bcrypt.compare(senha, senhaHash)
    if (!valida) {
        throw new Error('Email ou senha inválidos')
    }
}

passaport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.getByEmail(email)
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senhaHash)

            done(null, usuario)
        } catch (error) {
            done(error)
        }
    })
)