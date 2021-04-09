const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.fornecedor.id)
    resposta.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id
        const body = requisicao.body
        const dados = Object.assign({}, body, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(produto)
        )
    } catch (error) {
        proximo(error)
    }
})

roteador.delete('/idProduto', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.idProduto,
        fornecedor: requisicao.fornecedor.id
    }
    const produto = new Produto(dados)
    await produto.apagar()
    resposta.status(204)
    resposta.end()
})

module.exports = roteador