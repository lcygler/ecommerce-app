const { DataTypes } =  require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        punctuation:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },{
        timestamps: true
    })
}