const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Trolley",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uniqueCartId: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.ENUM,
        values: ["Open", "CheckedOut"],
      },
    },
    {
      timestamp: true,
    }
  );
};
