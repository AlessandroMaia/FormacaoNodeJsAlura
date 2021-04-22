const auth = require('../services/middlewares-auth')
module.exports = (req, res, next) => {
    req.estaAuth = false
    if (req.get('Authorization')) {
        return auth.bearer(req, res, next)
    }

    next()
}