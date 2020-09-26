const { DataTypes } = require('sequelize');

const User = global.sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    google_id: { type: DataTypes.STRING, allowNull: true },
    discord_id: { type: DataTypes.STRING, allowNull: true },
  },
  { timestamps: true },
);

module.exports = User;
