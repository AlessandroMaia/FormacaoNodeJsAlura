const autho = require('./middlewares-authorization')

module.exports= (entidade, acao ) => (req, res, next) => {
    if (req.estaAuth === true) {
        return autho(entidade, acao)(req, res, next)
    }

    next()
}