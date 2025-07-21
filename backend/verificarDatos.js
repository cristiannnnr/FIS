const sequelize = require('./config/database');
const models = require('./models');

async function verificarDatos() {
  try {
    console.log('🔍 Verificando datos en la base de datos...');
    
    // Verificar usuarios
    const usuarios = await models.Usuario.findAll();
    console.log(`\n👥 Usuarios (${usuarios.length}):`);
    usuarios.forEach(user => {
      console.log(`- ${user.nombre} (${user.email}) - Rol: ${user.rol}`);
    });
    
    // Verificar centros
    const centros = await models.CentroAtencion.findAll();
    console.log(`\n🏥 Centros (${centros.length}):`);
    centros.forEach(centro => {
      console.log(`- ${centro.nombre} - ID: ${centro.id}`);
    });
    
    // Verificar mascotas
    const mascotas = await models.Mascota.findAll({
      include: [{
        model: models.CentroAtencion,
        attributes: ['nombre']
      }]
    });
    console.log(`\n🐕 Mascotas (${mascotas.length}):`);
    mascotas.forEach(mascota => {
      console.log(`- ${mascota.nombre} (${mascota.especie}) - Centro: ${mascota.CentroAtencion?.nombre || 'Sin centro'} - ID: ${mascota.id}`);
    });
    
    console.log('\n✅ Verificación completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

verificarDatos(); 