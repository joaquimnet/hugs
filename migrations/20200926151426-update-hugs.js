'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn(
        'hugs',
        'message',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'hugs',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction },
      );
      return transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('hugs', 'message', { transaction });
      await queryInterface.removeColumn('hugs', 'name', { transaction });
      return transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return Promise.reject(err);
    }
  },
};
