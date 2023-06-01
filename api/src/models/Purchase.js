const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Purchase',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM('Preparing', 'On its way', 'Delivered', 'Canceled'),
        defaultValue: 'Preparing',
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );
};
