import { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

export default function Solicitudes({ usuario, token, mascotas }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [form, setForm] = useState({ id_mascota: '', estado: 'pendiente' });

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  function cargarSolicitudes() {
    axios.get(`http://localhost:3001/api/usuarios/${usuario.id}/solicitudes`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => setSolicitudes(res.data))
      .catch(() => setSolicitudes([]));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/solicitudes', {
      ...form,
      id_adoptante: usuario.id,
      estado: 'pendiente'
    }, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(() => {
        setForm({ id_mascota: '', estado: 'pendiente' });
        cargarSolicitudes();
      })
      .catch(err => alert('Error al crear solicitud: ' + (err.response?.data?.error || err.message)));
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Solicitar Adopción</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={2}>
          <Select name="id_mascota" value={form.id_mascota} onChange={handleChange} required displayEmpty sx={{ minWidth: 180 }}>
            <MenuItem value="">Selecciona una mascota</MenuItem>
            {mascotas.map(m => (
              <MenuItem key={m.id} value={m.id}>{m.nombre} ({m.especie})</MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained">Solicitar</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Mis Solicitudes de Adopción</Typography>
        <List>
          {solicitudes.map(s => (
            <ListItem key={s.id} divider>
              <ListItemText
                primary={`Mascota: ${mascotas.find(m => m.id === s.id_mascota)?.nombre || s.id_mascota}`}
                secondary={`Estado: ${s.estado} | Fecha: ${new Date(s.fecha).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
