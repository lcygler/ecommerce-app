const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Shopping',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: DataTypes.ENUM('Preparing', 'In progress', 'On the way', 'Delivered'),
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
