console.log("Cargando modelos...");

// 1. Importa TODOS los modelos primero
const CentroAtencion = require('./CentroAtencion');
const Mascota = require('./Mascota');
const FichaMedica = require('./FichaMedica');
const Usuario = require('./Usuario');
const SolicitudAdopcion = require('./SolicitudAdopcion');
const Alerta = require('./Alerta');
const Mensaje = require('./Mensaje');

console.log("Usuario es modelo:", typeof Usuario === 'function');
console.log("Mascota es modelo:", typeof Mascota === 'function');
console.log("SolicitudAdopcion es modelo:", typeof SolicitudAdopcion === 'function');

// 2. Luego define TODAS las relaciones
Mascota.belongsTo(CentroAtencion, { foreignKey: 'id_centro' });
CentroAtencion.hasMany(Mascota, { foreignKey: 'id_centro' });

Mascota.hasOne(FichaMedica, { foreignKey: 'id_mascota' });
FichaMedica.belongsTo(Mascota, { foreignKey: 'id_mascota' });

SolicitudAdopcion.belongsTo(Mascota, { foreignKey: 'id_mascota' });
SolicitudAdopcion.belongsTo(Usuario, { foreignKey: 'id_adoptante' });

Alerta.belongsTo(Mascota, { foreignKey: 'id_mascota' });

Mensaje.belongsTo(Usuario, { as: 'Remitente', foreignKey: 'remitente' });
Mensaje.belongsTo(Usuario, { as: 'Destinatario', foreignKey: 'destinatario' });

module.exports = {
  Usuario,
  Mascota,
  SolicitudAdopcion,
  FichaMedica,
  Alerta,
  CentroAtencion,
  Mensaje,
};
