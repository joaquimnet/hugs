'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hugs', {
      id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      claimed: { type: Sequelize.BOOLEAN, allowNull: false, default: false },
      claimedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('hugs');
  },
};
