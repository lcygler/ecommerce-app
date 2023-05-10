const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('seasons', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.ENUM('Autumn', 'Winter', 'Spring', 'Summer'),
            allowNull: false
        }
    })

}