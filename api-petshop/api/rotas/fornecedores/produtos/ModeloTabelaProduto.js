const Sequelize = require('sequelize')
const instancia = require('../../../database')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    Estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ModeloTabelaFornecedor'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('produto', colunas, opcoes)