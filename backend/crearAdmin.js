const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const models = require('./models');

async function crearAdmin() {
  try {
    console.log('🔄 Sincronizando base de datos...');
    await sequelize.sync({ alter: true });
    
    console.log('🔄 Verificando admin existente...');
    const adminExistente = await models.Usuario.findOne({ 
      where: { email: 'admin@example.com' } 
    });
    
    if (adminExistente) {
      console.log('⚠️  Admin ya existe, eliminando...');
      await adminExistente.destroy();
    }
    
    console.log('🔄 Creando nuevo admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await models.Usuario.create({
      nombre: 'Administrador',
      email: 'admin@example.com',
      password: hashedPassword,
      rol: 'admin',
      telefono: '123456789',
      direccion: 'Dirección Admin'
    });
    
    console.log('✅ Admin creado exitosamente:');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 ID:', admin.id);
    console.log('👤 Rol:', admin.rol);
    
    // Verificar que se puede encontrar
    const adminVerificado = await models.Usuario.findOne({ 
      where: { email: 'admin@example.com' } 
    });
    console.log('✅ Admin verificado en BD:', adminVerificado ? 'SÍ' : 'NO');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

crearAdmin(); 