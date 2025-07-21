const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SolicitudAdopcion = sequelize.define('SolicitudAdopcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_mascota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_adoptante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  id_centro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'solicitudes_adopcion',
  timestamps: false,
});

module.exports = SolicitudAdopcion;
