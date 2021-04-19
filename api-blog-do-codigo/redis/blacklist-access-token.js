const redis = require('redis')

const blacklist = redis.createClient({ prefix: 'blacklist-access-token:' })
const manipulaLista = require('./manipula-lista')
const manipulaBlacklist = manipulaLista(blacklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraTokenHash (token) {
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    create: async token => {
        const dataExp = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await manipulaBlacklist.adiciona(tokenHash, '', dataExp)
    }, 
    getToken: async token => {
        const tokenHash = geraTokenHash(token)
        return manipulaBlacklist.contemToken(tokenHash)
    },

}