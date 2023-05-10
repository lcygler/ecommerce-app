const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('shopping', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        state:{
            type: DataTypes.ENUM('Preparing', 'in progress', 'on the way', 'delivered'),  
        },
        total:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },{
        timestamps: true
    }) 
} 