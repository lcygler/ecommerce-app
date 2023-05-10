const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('cartDetail',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull: false 
        },
         price: {
            type: DataTypes.FLOAT,
            allowNull: false
         },
         subtotal:{
            type: DataTypes.FLOAT,
            allowNull: false
         }
    }, {
        timestamps: true
    })
}
