const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('generos',{
        id:{
            type: DataTypes.TEXT,
            unique: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING
        }
    })
}

