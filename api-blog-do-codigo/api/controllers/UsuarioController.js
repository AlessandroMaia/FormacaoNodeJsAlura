const Services = require('../services/UsuariosServices')
const UsuariosServices = new Services()
const jwt = require('jsonwebtoken')

function criaTokenJWT (usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token;
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
        const token = criaTokenJWT(req.user)
        res.set('Authorization', token)
        res.status(204).send()
    }
}


module.exports = UsuarioController