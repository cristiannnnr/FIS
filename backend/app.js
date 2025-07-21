console.log("Iniciando app.js...");
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const models = require('./models'); // <-- Asegura que los modelos se importen
const mascotasRoutes = require('./routes/mascotas');
const solicitudesRoutes = require('./routes/solicitudes');
const fichasRoutes = require('./routes/fichas');
const alertasRoutes = require('./routes/alertas');
const centrosRoutes = require('./routes/centros');
const mensajesRoutes = require('./routes/mensajes');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json()); // ¡Esto es importante!

app.get('/', (req, res) => {
  res.send('API de gestión de adopciones y alertas de mascotas');
});

app.use('/api/mascotas', mascotasRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/fichas', fichasRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/centros', centrosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
  });
});