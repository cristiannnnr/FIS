import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import MascotaForm from '../components/MascotaForm';
import MascotaCard from '../components/MascotaCard';
import DetalleMascota from '../components/DetalleMascota';

export default function Mascotas({ usuario, token, centros }) {
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({
    nombre: '', especie: '', raza: '', edad: '', sexo: '', descripcion: '', foto: '', estado: '', id_centro: ''
  });
  const [editId, setEditId] = useState(null);
  const [detalleMascota, setDetalleMascota] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  useEffect(() => {
    cargarMascotas();
  }, []);

  function cargarMascotas() {
    axios.get('http://localhost:3001/api/mascotas')
      .then(res => setMascotas(res.data))
      .catch(() => setMascotas([]));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, edad: Number(form.edad), id_centro: Number(form.id_centro) };
    const config = { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) };
    const url = editId ? `http://localhost:3001/api/mascotas/${editId}` : 'http://localhost:3001/api/mascotas';
    fetch(url, config)
      .then(() => {
        setForm({ nombre: '', especie: '', raza: '', edad: '', sexo: '', descripcion: '', foto: '', estado: '', id_centro: '' });
        setEditId(null);
        cargarMascotas();
      });
  }

  function handleEdit(mascota) {
    setEditId(mascota.id);
    setForm({ ...mascota });
  }

  function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar esta mascota?')) return;
    fetch(`http://localhost:3001/api/mascotas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    }).then(cargarMascotas);
  }

  function handleDetails(mascota) {
    setDetalleMascota(mascota);
    setMostrarDetalle(true);
  }

  function handleCancel() {
    setEditId(null);
    setForm({ nombre: '', especie: '', raza: '', edad: '', sexo: '', descripcion: '', foto: '', estado: '', id_centro: '' });
  }

  return (
    <Box
      sx={{
        background: '#fafbfc',
        minHeight: '100vh',
        width: '100vw',
        pt: { xs: 2, md: 4 },
        pb: { xs: 2, md: 4 },
        boxSizing: 'border-box',
        m: 0,
        p: 0,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#222' }}>
          Mascotas Disponibles
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#666' }}>
          {mascotas.length} mascota{mascotas.length !== 1 ? 's' : ''} esperando un hogar
        </Typography>
      </Box>

      {usuario && (
        <Box sx={{ mb: 4 }}>
          <MascotaForm
            form={form}
            centros={centros}
            editId={editId}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Box>
      )}

      {!usuario && (
        <Box sx={{ mb: 4, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#888' }}>
            ¿Quieres agregar o adoptar una mascota?{' '}
            <Button href="/login" variant="outlined" size="small" sx={{ ml: 1 }}>
              Inicia sesión
            </Button>
          </Typography>
        </Box>
      )}

      {mascotas.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No hay mascotas disponibles en este momento
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            minHeight: 300,
            pl: 0,
            ml: 0,
          }}
        >
          {mascotas.map(m => (
            <Box
              key={m.id}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%', lg: '1 1 22%' },
                maxWidth: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                minWidth: 260,
                display: 'flex',
              }}
            >
              <MascotaCard
                mascota={m}
                onEdit={usuario ? handleEdit : undefined}
                onDelete={usuario ? handleDelete : undefined}
                onDetails={handleDetails}
              />
            </Box>
          ))}
        </Box>
      )}
      <DetalleMascota
        mascota={detalleMascota}
        centros={centros}
        open={mostrarDetalle}
        onClose={() => setMostrarDetalle(false)}
      />
    </Box>
  );
}
