'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    descricao: DataTypes.STRING,
    identificacaoPagamento: DataTypes.STRING,
    nomeContribuinte: DataTypes.STRING,
    formaPagamento: DataTypes.STRING,
    cnpjContribuinte: DataTypes.STRING,
    idTransacao: DataTypes.STRING,
    numeroReferencia: DataTypes.STRING,
    dataPagamento: DataTypes.DATE,
    valor: DataTypes.REAL,
    dataConfirmacaoPagamento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};