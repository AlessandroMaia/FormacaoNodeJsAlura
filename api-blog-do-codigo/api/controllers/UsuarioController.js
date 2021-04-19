const Services = require('../services/UsuariosServices')
const UsuariosServices = new Services()
const jwt = require('jsonwebtoken')
const blacklist = require('../../redis/blacklist-access-token')
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token')
const crypto = require('crypto')
const moment = require('moment')

function criaTokenJWT (usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
    return token;
}

async function criaTokenOpaco (usuario) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExp = moment().add(5, 'd').unix()
    await allowlistRefreshToken.adiciona(tokenOpaco, usuario.id, dataExp)
    return tokenOpaco
}

class UsuarioController {
    static async getAll (req, res) {
        try {
            const usuarios = await UsuariosServices.getAllService()
            return res.status(200).send(usuarios)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async create (req, res) {
        try {
            const body = req.body
            const usuario = await UsuariosServices.createService(body)
            return res.status(201).send(usuario)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async delete (req, res) {
        try {
            const { id } = req.params
            await UsuariosServices.deleteService(id)
            return res.status(201).send({message: `O usuário com id ${id} foi apagado`})
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async login (req, res) {
        try {
            const accessToken = criaTokenJWT(req.user)
            const refreshToken = await criaTokenOpaco(req.user)
            res.set('Authorization', accessToken)
            res.status(200).json({ refreshToken })
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }

    static async logout (req, res) {
        try {
            const token = req.token
            await blacklist.create(token)
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ erro: erro.message })
        }
    }
}


module.exports = UsuarioController