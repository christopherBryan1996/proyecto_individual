const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.TEXT,
      primaryKey:true,
      unique:true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    releaseDate:{
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.STRING
    },
    plataformas:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaImage:{
      type: DataTypes.TEXT
    }
  });
};
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *