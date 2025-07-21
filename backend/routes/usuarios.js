const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las solicitudes de adopción de un usuario (adoptante)
router.get('/:id/solicitudes', async (req, res) => {
  try {
    const solicitudes = await require('../models/SolicitudAdopcion').findAll({
      where: { id_adoptante: req.params.id }
    });
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los mensajes enviados o recibidos por un usuario
router.get('/:id/mensajes', async (req, res) => {
  try {
    const Mensaje = require('../models/Mensaje');
    const mensajes = await Mensaje.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { remitente: req.params.id },
          { destinatario: req.params.id }
        ]
      }
    });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
