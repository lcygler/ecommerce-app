const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categories',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
           autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    },{
        timestamp: true
    })
}