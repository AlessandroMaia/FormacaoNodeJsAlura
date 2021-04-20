const Services = require('../services/UsuariosServices')
const UsuariosServices = new Services()
const tokens = require('../services/tokens')
const { EmailVerificacao } = require('../services/emails')

function geraEndereco (rota, id) {
    const baseURL = process.env.BASE_URL
    return `${baseURL}${rota}${id}`
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
            
            const endereco = geraEndereco('/usuario/verifica_email/', usuario.id)
            const emailVerificacao = new EmailVerificacao(usuario, endereco)
            emailVerificacao.enviaEmail().catch(console.log)

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
            const accessToken = tokens.access.cria(req.user.id)
            const refreshToken = await tokens.refresh.cria(req.user.id)
            res.set('Authorization', accessToken)
            res.status(200).json({ refreshToken })
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }

    static async logout (req, res) {
        try {
            const token = req.token
            await tokens.access.invalida(token)
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ erro: erro.message })
        }
    }
}


module.exports = UsuarioController