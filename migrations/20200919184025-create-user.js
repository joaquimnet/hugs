'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false },
      google_id: { type: Sequelize.STRING, allowNull: true },
      discord_id: { type: Sequelize.STRING, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
