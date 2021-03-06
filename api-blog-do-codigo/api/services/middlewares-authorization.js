const control = require('../controleDeAcesso')
const metodos = {
    ler: {
        todos: 'readAny',
        apenasSeu: 'readOwn'
    },
    criar: {
        todos: 'createAny',
        apenasSeu: 'createown'
    },
    remover: {
        todos: 'deleteAny',
        apenasSeu: 'deleteOwn'
    }
}

module.exports = (entidade, acao) => (req, res, next) => {
    const permissoesDoCargo = control.can(req.user.cargo)
    const acoes = metodos[acao]
    const permissaoTodos = permissoesDoCargo[acoes.todos](entidade)
    const permissaoApenasSeu = permissoesDoCargo[acoes.apenasSeu](entidade)
    const permissao = permissoesDoCargo[acao](entidade)

    if (permissaoTodos.granted === false && permissaoApenasSeu.granted === false) {
        res.status(403).end()
        return
    }

    req.acesso = {
        todos: {
            permitido: permissaoTodos.granted,
            atributos: permissaoTodos.attributes
        },
        apenasSeu: {
            permitido: permissaoApenasSeu.granted,
            atributos: permissaoApenasSeu.attributes
        }
    }

    next()
}