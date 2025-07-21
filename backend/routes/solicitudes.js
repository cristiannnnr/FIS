const express = require('express');
const router = express.Router();
const SolicitudAdopcion = require('../models/SolicitudAdopcion');
const Mascota = require('../models/Mascota');
const Usuario = require('../models/Usuario');

// Obtener todas las solicitudes
router.get('/', async (req, res) => {
  try {
    const solicitudes = await SolicitudAdopcion.findAll();
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva solicitud
router.post('/', async (req, res) => {
  try {
    const solicitud = await SolicitudAdopcion.create(req.body);
    res.status(201).json(solicitud);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una solicitud por ID
router.get('/:id', async (req, res) => {
  try {
    const solicitud = await SolicitudAdopcion.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una solicitud
router.put('/:id', async (req, res) => {
  try {
    const solicitud = await SolicitudAdopcion.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await solicitud.update(req.body);
    res.json(solicitud);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una solicitud
router.delete('/:id', async (req, res) => {
  try {
    const solicitud = await SolicitudAdopcion.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await solicitud.destroy();
    res.json({ message: 'Solicitud eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las solicitudes con datos de mascota y usuario
router.get('/completo', async (req, res) => {
  try {
    const solicitudes = await SolicitudAdopcion.findAll({
      include: [
        { model: Mascota, attributes: ['id', 'nombre', 'especie', 'raza'] },
        { model: Usuario, attributes: ['id', 'nombre', 'email'], as: 'Usuario' }
      ]
    });
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
