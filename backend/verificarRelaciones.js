const sequelize = require('./config/database');
const models = require('./models');

async function verificarRelaciones() {
  try {
    console.log('🔍 Verificando relaciones entre centros y mascotas...');
    
    // Obtener todos los centros
    const centros = await models.CentroAtencion.findAll();
    
    for (const centro of centros) {
      console.log(`\n🏥 Centro: ${centro.nombre} (ID: ${centro.id})`);
      
      // Buscar mascotas asociadas
      const mascotas = await models.Mascota.findAll({
        where: { id_centro: centro.id }
      });
      
      if (mascotas.length === 0) {
        console.log('  ✅ No tiene mascotas asociadas (se puede eliminar)');
      } else {
        console.log(`  ⚠️  Tiene ${mascotas.length} mascota(s) asociada(s):`);
        mascotas.forEach(mascota => {
          console.log(`    - ${mascota.nombre} (${mascota.especie}) - ID: ${mascota.id}`);
        });
        console.log('  ❌ NO se puede eliminar hasta reasignar las mascotas');
      }
    }
    
    console.log('\n✅ Verificación completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

verificarRelaciones(); 