const modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar() {
        return modelo.findAll()
    }
}