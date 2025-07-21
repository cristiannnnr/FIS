const express = require('express');
const router = express.Router();
const CentroAtencion = require('../models/CentroAtencion');
const Mascota = require('../models/Mascota');

// Obtener todos los centros de atención
router.get('/', async (req, res) => {
  try {
    const centros = await CentroAtencion.findAll();
    res.json(centros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo centro de atención
router.post('/', async (req, res) => {
  try {
    const centro = await CentroAtencion.create(req.body);
    res.status(201).json(centro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un centro de atención por ID
router.get('/:id', async (req, res) => {
  try {
    const centro = await CentroAtencion.findByPk(req.params.id);
    if (!centro) return res.status(404).json({ error: 'Centro no encontrado' });
    res.json(centro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un centro de atención
router.put('/:id', async (req, res) => {
  try {
    const centro = await CentroAtencion.findByPk(req.params.id);
    if (!centro) return res.status(404).json({ error: 'Centro no encontrado' });
    await centro.update(req.body);
    res.json(centro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un centro de atención
router.delete('/:id', async (req, res) => {
  try {
    const centro = await CentroAtencion.findByPk(req.params.id);
    if (!centro) return res.status(404).json({ error: 'Centro no encontrado' });
    
    // Verificar si hay mascotas asociadas
    const mascotasAsociadas = await Mascota.findAll({
      where: { id_centro: req.params.id }
    });
    
    if (mascotasAsociadas.length > 0) {
      return res.status(400).json({ 
        error: `No se puede eliminar el centro porque tiene ${mascotasAsociadas.length} mascota(s) asociada(s). Primero debe reasignar o eliminar las mascotas.`,
        mascotasAsociadas: mascotasAsociadas.map(m => ({ id: m.id, nombre: m.nombre }))
      });
    }
    
    await centro.destroy();
    res.json({ message: 'Centro eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar centro:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las mascotas de un centro de atención
router.get('/:id/mascotas', async (req, res) => {
  try {
    const centroId = req.params.id;
    const mascotas = await require('../models/Mascota').findAll({
      where: { id_centro: centroId }
    });
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
