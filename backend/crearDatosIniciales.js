const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const models = require('./models');

async function crearDatosIniciales() {
  try {
    console.log('🔄 Sincronizando base de datos...');
    
    // Sincronizar las tablas
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada');
    
    // Crear admin
    console.log('🔄 Creando admin...');
    const adminExistente = await models.Usuario.findOne({ where: { email: 'admin@example.com' } });
    
    if (!adminExistente) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await models.Usuario.create({
        nombre: 'Administrador',
        email: 'admin@example.com',
        password: hashedPassword,
        rol: 'admin',
        telefono: '123456789',
        direccion: 'Dirección Admin'
      });
      console.log('✅ Admin creado:', admin.email);
    } else {
      console.log('⚠️  Admin ya existe');
    }
    
    // Crear centros
    console.log('🔄 Creando centros...');
    const centros = [
      {
        nombre: 'Centro Veterinario San Francisco',
        telefono: '555-0101',
        email: 'info@centrosanfrancisco.com',
        ubicacion: 'San Francisco, CA',
        horario: 'Lunes a Viernes 8:00-18:00',
        foto: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400'
      },
      {
        nombre: 'Refugio de Animales Esperanza',
        telefono: '555-0202',
        email: 'contacto@refugioesperanza.com',
        ubicacion: 'Los Angeles, CA',
        horario: 'Todos los días 9:00-17:00',
        foto: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400'
      },
      {
        nombre: 'Clínica Veterinaria Mascotas Felices',
        telefono: '555-0303',
        email: 'info@mascotasfelices.com',
        ubicacion: 'San Diego, CA',
        horario: 'Lunes a Sábado 7:00-19:00',
        foto: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=400'
      }
    ];

    for (const centro of centros) {
      const existe = await models.CentroAtencion.findOne({ where: { nombre: centro.nombre } });
      if (!existe) {
        await models.CentroAtencion.create(centro);
        console.log(`✅ Centro creado: ${centro.nombre}`);
      } else {
        console.log(`⚠️  Centro ya existe: ${centro.nombre}`);
      }
    }
    
    // Crear mascotas
    console.log('🔄 Creando mascotas...');
    const mascotas = [
      {
        nombre: 'Luna',
        especie: 'Perro',
        raza: 'Golden Retriever',
        edad: 3,
        sexo: 'Hembra',
        descripcion: 'Luna es una perrita muy cariñosa y juguetona. Le encanta pasear y jugar con niños.',
        foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
        estado: 'Disponible',
        id_centro: 1
      },
      {
        nombre: 'Max',
        especie: 'Gato',
        raza: 'Siamés',
        edad: 2,
        sexo: 'Macho',
        descripcion: 'Max es un gato muy independiente pero cariñoso. Se adapta bien a espacios pequeños.',
        foto: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
        estado: 'Disponible',
        id_centro: 2
      },
      {
        nombre: 'Rocky',
        especie: 'Perro',
        raza: 'Labrador',
        edad: 1,
        sexo: 'Macho',
        descripcion: 'Rocky es un cachorro muy activo y enérgico. Perfecto para familias deportistas.',
        foto: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400',
        estado: 'Disponible',
        id_centro: 3
      }
    ];

    for (const mascota of mascotas) {
      const existe = await models.Mascota.findOne({ where: { nombre: mascota.nombre } });
      if (!existe) {
        await models.Mascota.create(mascota);
        console.log(`✅ Mascota creada: ${mascota.nombre}`);
      } else {
        console.log(`⚠️  Mascota ya existe: ${mascota.nombre}`);
      }
    }
    
    console.log('🎉 ¡Datos iniciales creados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log('- Admin: admin@example.com / admin123');
    console.log('- 3 centros de atención creados');
    console.log('- 3 mascotas creadas');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

crearDatosIniciales(); 