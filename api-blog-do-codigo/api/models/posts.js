'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {}
  };
  posts.init({
    titulo: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
        msg: 'O titulo deve ter entre 5 e 50 caracteres'},
        notNull: {
          msg: 'Por favor insira o titulo'
        }
      }
    },
    conteudo: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 140],
        msg: 'O conteudo deve ter entre 1 e 140 caracteres'},
        notNull: {
          msg: 'Por favor insira o conteudo'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};