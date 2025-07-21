const express = require('express');
const router = express.Router();
const Mascota = require('../models/Mascota');
const CentroAtencion = require('../models/CentroAtencion');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');

// Obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const mascotas = await Mascota.findAll();
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva mascota (solo autenticados)
router.post('/', auth, async (req, res) => {
  try {
    const mascota = await Mascota.create(req.body);
    res.status(201).json(mascota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una mascota por ID
router.get('/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json(mascota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una mascota (solo autenticados)
router.put('/:id', auth, async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    await mascota.update(req.body);
    res.json(mascota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una mascota (solo admin)
router.delete('/:id', auth, authorizeRoles('admin'), async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    await mascota.destroy();
    res.json({ message: 'Mascota eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener la ficha médica de una mascota
router.get('/:id/ficha', async (req, res) => {
  try {
    const ficha = await require('../models/FichaMedica').findOne({
      where: { id_mascota: req.params.id }
    });
    if (!ficha) return res.status(404).json({ error: 'Ficha médica no encontrada' });
    res.json(ficha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las mascotas con su centro de atención
router.get('/con-centro', async (req, res) => {
  try {
    const mascotas = await require('../models/Mascota').findAll({
      include: [
        { model: CentroAtencion, attributes: ['id', 'nombre', 'ubicacion', 'contacto'] }
      ]
    });
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las fichas médicas con datos de mascota
router.get('/con-mascota', async (req, res) => {
  try {
    const fichas = await require('../models/FichaMedica').findAll({
      include: [
        { model: Mascota, attributes: ['id', 'nombre', 'especie', 'raza'] }
      ]
    });
    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
