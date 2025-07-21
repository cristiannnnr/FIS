const express = require('express');
const router = express.Router();
const Alerta = require('../models/Alerta');

// Obtener todas las alertas
router.get('/', async (req, res) => {
  try {
    const alertas = await Alerta.findAll();
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva alerta
router.post('/', async (req, res) => {
  try {
    const alerta = await Alerta.create(req.body);
    res.status(201).json(alerta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una alerta por ID
router.get('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findByPk(req.params.id);
    if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una alerta
router.put('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findByPk(req.params.id);
    if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });
    await alerta.update(req.body);
    res.json(alerta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una alerta
router.delete('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findByPk(req.params.id);
    if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });
    await alerta.destroy();
    res.json({ message: 'Alerta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar alertas por ubicación y/o tipo
router.get('/buscar', async (req, res) => {
  try {
    const { ubicacion, tipo } = req.query;
    const where = {};
    if (ubicacion) where.ubicacion = ubicacion;
    if (tipo) where.tipo = tipo;
    const alertas = await require('../models/Alerta').findAll({ where });
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
