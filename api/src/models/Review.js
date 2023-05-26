const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      punctuation: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      disable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
