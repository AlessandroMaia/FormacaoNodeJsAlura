const jwt = require('jsonwebtoken')
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token')
const blocklistAccessToken = require('../../redis/blacklist-access-token')
const crypto = require('crypto')
const moment = require('moment')

function criaTokenJWT ( id, [tempoQuantidade, tempoUnidade] ) {
    const payload = { id }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade + tempoUnidade })
    return token;
}

async function verificaTokenJWT ( token, nome, blocklist ) {
    await verificaTokenNaBlockList(token, nome, blocklist)
    const { id } = jwt.verify(token, process.env.CHAVE_JWT)
    return id
}

async function verificaTokenNaBlockList (token, nome, blocklist) {
    if (!blocklist) {
        return;
    }
    const tokenNaBlacklist = await blocklist.getToken(token)
    if (tokenNaBlacklist) {
        throw new jwt.JsonWebTokenError(`${nome} inválido por logout`)
    }
}

function invalidaTokenJWT (token, blocklist) {
    return blocklist.create(token)
}

async function criaTokenOpaco ( id, [tempoQuantidade, tempoUnidade], allowlist) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExp = moment().add(tempoQuantidade, tempoUnidade).unix()
    await allowlist.adiciona(tokenOpaco, id, dataExp)
    return tokenOpaco
}

function verificaTokenValido(id, nome) {
    if (!id) {
        throw new Error(`${nome}  inválido`)
    }
}

function verificaTokenEnviado(token, nome) {
    if (!token) {
        throw new Error(`${nome} não enviado`)
    }
}

async function verificaTokenOpaco(token, nome, allowlist) {
    verificaTokenEnviado(token, nome)
    const id = await allowlist.buscaValor(token)
    verificaTokenValido(id, nome)
    return id
}

async function invalidaTokenOpaco(token, allowlist) {
    await allowlist.deleta(token)
}


module.exports = {
    access: {
        nome: 'access token',
        lista: blocklistAccessToken,
        expiracao: [15, 'm'],
        cria ( id ) {
            return criaTokenJWT(id, this.expiracao)
        },
        verifica ( token ) {
            return verificaTokenJWT(token, this.nome, this.lista)
        }, 
        invalida ( token ) {
            return invalidaTokenJWT(token, this.lista)
        }
    }, 
    refresh: {
        nome: 'refresh token',
        expiracao: [15, 'm'],
        lista: allowlistRefreshToken,
        cria ( id ) {
            return criaTokenOpaco(id, this.expiracao, this.lista)
        },
        verifica ( token ) {
            return verificaTokenOpaco(token, this. nome, this.lista)
        }, 
        invalida ( token ) {
            return invalidaTokenOpaco(token, this.lista)
        }
    },
    verificacaoEmail: {
        nome: 'token de verificação de e-mail',
        expiracao: [1, 'h'],
        cria(id){
            return criaTokenJWT(id, this.expiracao)
        }, 
        verifica(token){
            return verificaTokenJWT(token, this.nome)
        }
    }
}

