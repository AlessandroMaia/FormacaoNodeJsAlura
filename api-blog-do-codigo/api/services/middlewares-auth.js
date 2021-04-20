const passport = require('passport');
const Services = require('../services/UsuariosServices')
const Usuario = new Services()
const tokens = require('../services/tokens')




module.exports = {
    local (req, res, next) {
        passport.authenticate(
            "local",
            { session: false },
            (erro, usuario, info) => {
                if (erro) {
                    return res.status(500).json({
                        erro: erro.message
                    })
                }

                if (!usuario) {
                    return res.status(401).json()
                }

                req.user = usuario
                return next()
            }
        )(req, res, next)
    },
    bearer (req, res, next) {
        passport.authenticate(
            'bearer',
            { session: false },
            (erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({
                        erro: erro.message
                    })
                }

                if (erro && erro.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        erro: erro.message, expiradoEm: erro.expiredAt
                    })
                }

                if (erro) {
                    return res.status(500).json({
                        erro: erro.message
                    })
                }
                
                if (!usuario) {
                    return res.status(401).json()
                }
                req.token = info.token
                req.user = usuario
                return next()
            }
        )(req, res, next)
    },
    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.body
            const id = await tokens.refresh.verifica(refreshToken)
            console.log(id)
            await tokens.refresh.invalida(refreshToken)
            req.user = await Usuario.getByIdService(id)
            console.log(req.user)
            return next()
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}
