const Services = require('../services/UsuariosServices')
const UsuariosServices = new Services()
const jwt = require('jsonwebtoken')
const blacklist = require('../../redis/manipula-blacklist')
const crypto = require('crypto')
const moment = require('moment')

function criaTokenJWT (usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
    return token;
}

function criaTokenOpaco (usuario) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const 
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
            const acessToken = criaTokenJWT(req.user)
            const refreshToken = criaTokenOpaco(req.user)
            res.set('Authorization', acessToken)
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