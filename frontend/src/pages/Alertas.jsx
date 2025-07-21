import { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

export default function Alertas({ usuario, token, mascotas }) {
  const [alertas, setAlertas] = useState([]);
  const [form, setForm] = useState({
    tipo: 'perdido',
    id_mascota: '',
    detalles: '',
    foto: '',
    ubicacion: ''
  });

  useEffect(() => {
    cargarAlertas();
  }, []);

  function cargarAlertas() {
    axios.get('http://localhost:3001/api/alertas')
      .then(res => setAlertas(res.data))
      .catch(() => setAlertas([]));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/alertas', form, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(() => {
        setForm({ tipo: 'perdido', id_mascota: '', detalles: '', foto: '', ubicacion: '' });
        cargarAlertas();
      })
      .catch(err => alert('Error al crear alerta: ' + (err.response?.data?.error || err.message)));
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Publicar Alerta</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexWrap="wrap" gap={2} mb={2}>
          <Select name="tipo" value={form.tipo} onChange={handleChange} required sx={{ minWidth: 120 }}>
            <MenuItem value="perdido">Perdido</MenuItem>
            <MenuItem value="encontrado">Encontrado</MenuItem>
          </Select>
          <Select name="id_mascota" value={form.id_mascota} onChange={handleChange} required displayEmpty sx={{ minWidth: 180 }}>
            <MenuItem value="">Selecciona una mascota</MenuItem>
            {mascotas.map(m => (
              <MenuItem key={m.id} value={m.id}>{m.nombre} ({m.especie})</MenuItem>
            ))}
          </Select>
          <TextField name="detalles" label="Detalles" value={form.detalles} onChange={handleChange} required />
          <TextField name="foto" label="URL Foto" value={form.foto} onChange={handleChange} />
          <TextField name="ubicacion" label="Ubicación" value={form.ubicacion} onChange={handleChange} required />
          <Button type="submit" variant="contained">Publicar</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Alertas de Mascotas</Typography>
        <List>
          {alertas.map(a => (
            <ListItem key={a.id} divider>
              <ListItemText
                primary={`${a.tipo === 'perdido' ? 'Perdido' : 'Encontrado'}: ${mascotas.find(m => m.id === a.id_mascota)?.nombre || a.id_mascota}`}
                secondary={`Ubicación: ${a.ubicacion} | Detalles: ${a.detalles}`}
              />
              {a.foto && <img src={a.foto} alt="foto" style={{ width: 60, height: 60, objectFit: 'cover', marginLeft: 16 }} />}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
