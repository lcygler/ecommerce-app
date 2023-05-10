const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('trolley', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true 
        },
        state: {
            type: DataTypes.FLOAT
        }
    },{
        timestamp: true
    })

}