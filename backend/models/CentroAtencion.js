const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CentroAtencion = sequelize.define('CentroAtencion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'centros_atencion',
  timestamps: false,
});

module.exports = CentroAtencion;
