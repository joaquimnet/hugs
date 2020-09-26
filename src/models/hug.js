const { DataTypes } = require('sequelize');

const Hug = global.sequelize.define(
  'hug',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    claimed: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    claimedBy: {
      type: DataTypes.STRING(36),
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
    },
  },
  { timestamps: true },
);

module.exports = Hug;
