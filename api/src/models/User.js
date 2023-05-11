const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lasname:{
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    Birthdate:{
      type: DataTypes.DATE,
      allowNull: false
    },
    phone_Number:{
      type: DataTypes.STRING,
      allowNull: false
    },
    state:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isadmin:{
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    timestamps: true,
  });
};