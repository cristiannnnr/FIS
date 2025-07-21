const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FichaMedica = sequelize.define('FichaMedica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_mascota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  vacunas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  citas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_centro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'fichas_medicas',
  timestamps: false,
});

module.exports = FichaMedica;
