const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('producs', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        gender: {
            type:DataTypes.STRING,
            allownull: false
        },
        description:{
            type: DataTypes.STRING,
            allownull: false
        },
        price:{
            type: DataTypes.FLOAT,
            allownull: false
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        discounts:{
            type: DataTypes.FLOAT,
            defaultValue: 0.00
        },
        Stock:{
            type: DataTypes.INTEGER,
            allownull:false
        },
        image:{
            type:DataTypes.STRING,
            allownull:false
        },
        disable:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{
        timestamp: true
    })
}