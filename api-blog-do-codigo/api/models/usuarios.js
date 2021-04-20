'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
    }
  };
  usuarios.init({
    nome: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor insira o nome'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        notNull: {
          msg: 'Por favor insira o email'
        }
      }
    },
    senhaHash: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 64],
        msg: 'A senha deve ter entre 8 e 64 caracteres'},
        notNull: {
          msg: 'Por favor insira a senha'
        }
      }
    },
    emailVerificado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    }
  },{
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};