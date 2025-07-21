const express = require('express');
const router = express.Router();
const FichaMedica = require('../models/FichaMedica');
const Mascota = require('../models/Mascota');
const CentroAtencion = require('../models/CentroAtencion');

// Obtener todas las fichas médicas
router.get('/', async (req, res) => {
  try {
    const fichas = await FichaMedica.findAll();
    res.json(fichas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva ficha médica
router.post('/', async (req, res) => {
  try {
    const ficha = await FichaMedica.create(req.body);
    res.status(201).json(ficha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una ficha médica por ID
router.get('/:id', async (req, res) => {
  try {
    const ficha = await FichaMedica.findByPk(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha médica no encontrada' });
    res.json(ficha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una ficha médica
router.put('/:id', async (req, res) => {
  try {
    const ficha = await FichaMedica.findByPk(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha médica no encontrada' });
    await ficha.update(req.body);
    res.json(ficha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una ficha médica
router.delete('/:id', async (req, res) => {
  try {
    const ficha = await FichaMedica.findByPk(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha médica no encontrada' });
    await ficha.destroy();
    res.json({ message: 'Ficha médica eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las mascotas con su centro de atención
router.get('/con-centro', async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({
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
    const fichas = await FichaMedica.findAll({
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
