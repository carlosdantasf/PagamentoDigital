'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING
      },
      identificacaoPagamento: {
        type: Sequelize.STRING
      },
      nomeContribuinte: {
        type: Sequelize.STRING
      },
      formaPagamento: {
        type: Sequelize.STRING
      },
      cnpjContribuinte: {
        type: Sequelize.STRING
      },
      idTransacao: {
        type: Sequelize.STRING
      },
      numeroReferencia: {
        type: Sequelize.STRING
      },
      dataPagamento: {
        type: Sequelize.DATE
      },
      valor: {
        type: Sequelize.REAL
      },
      dataConfirmacaoPagamento: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};