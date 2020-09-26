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
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    claimed: { type: DataTypes.BOOLEAN, allowNull: false, default: 0 },
    claimedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true },
);

module.exports = Hug;
