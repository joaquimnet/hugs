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
      claimedBy: {
        type: Sequelize.STRING(36),
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('hugs');
  },
};
