const express = require('express');
const router = express.Router();
const Mensaje = require('../models/Mensaje');

// Obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const mensajes = await Mensaje.findAll();
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo mensaje
router.post('/', async (req, res) => {
  try {
    const mensaje = await Mensaje.create(req.body);
    res.status(201).json(mensaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un mensaje por ID
router.get('/:id', async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un mensaje
router.put('/:id', async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    await mensaje.update(req.body);
    res.json(mensaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un mensaje
router.delete('/:id', async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    await mensaje.destroy();
    res.json({ message: 'Mensaje eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
