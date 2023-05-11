const { DataTypes } =  require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('admin', {
        id: {
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lasName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}