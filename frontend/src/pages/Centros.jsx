import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import CentroForm from '../components/CentroForm';
import CentroCard from '../components/CentroCard';
import DetalleCentro from '../components/DetalleCentro';

export default function Centros({ centros, centroForm, onCentroChange, onCentroSubmit, onRecargarCentros }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', ubicacion: '', horario: '', foto: '' });
  const [detalleCentro, setDetalleCentro] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  useEffect(() => {
    if (centroForm) {
      setForm(centroForm);
    }
  }, [centroForm]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      // Editar centro existente
      axios.put(`http://localhost:3001/api/centros/${editId}`, form, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
        .then(() => {
          setForm({ nombre: '', telefono: '', email: '', ubicacion: '', horario: '', foto: '' });
          setEditId(null);
          if (onRecargarCentros) {
            onRecargarCentros();
          }
        })
        .catch(err => alert('Error al editar centro: ' + (err.response?.data?.error || err.message)));
    } else {
      // Crear nuevo centro
      onCentroSubmit(e);
      // Recargar centros después de crear
      setTimeout(() => {
        if (onRecargarCentros) {
          onRecargarCentros();
        }
      }, 100);
    }
  }

  function handleEdit(centro) {
    setEditId(centro.id);
    setForm({
      nombre: centro.nombre,
      telefono: centro.telefono,
      email: centro.email,
      ubicacion: centro.ubicacion,
      horario: centro.horario,
      foto: centro.foto || ''
    });
  }

  function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este centro?')) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No tienes permisos para eliminar centros. Inicia sesión.');
      return;
    }

    axios.delete(`http://localhost:3001/api/centros/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((response) => {
        console.log('Centro eliminado:', response.data);
        // Recargar la lista de centros
        if (onRecargarCentros) {
          onRecargarCentros();
        }
      })
      .catch(err => {
        console.error('Error al eliminar centro:', err);
        if (err.response?.status === 401) {
          alert('No tienes permisos para eliminar centros.');
        } else if (err.response?.status === 404) {
          alert('Centro no encontrado.');
        } else if (err.response?.status === 400) {
          // Error de restricción de clave foránea
          const errorMsg = err.response?.data?.error || 'No se puede eliminar el centro';
          const mascotas = err.response?.data?.mascotasAsociadas || [];
          
          if (mascotas.length > 0) {
            const mascotasList = mascotas.map(m => `- ${m.nombre}`).join('\n');
            alert(`${errorMsg}\n\nMascotas asociadas:\n${mascotasList}\n\nPrimero debe reasignar o eliminar estas mascotas.`);
          } else {
            alert(errorMsg);
          }
        } else {
          alert('Error al eliminar centro: ' + (err.response?.data?.error || err.message));
        }
      });
  }

  function handleDetails(centro) {
    setDetalleCentro(centro);
    setMostrarDetalle(true);
  }

  function handleCancel() {
    setEditId(null);
    setForm({ nombre: '', telefono: '', email: '', ubicacion: '', horario: '', foto: '' });
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
          Centros de Atención
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#666' }}>
          {centros?.length || 0} centro{centros?.length !== 1 ? 's' : ''} disponibles
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <CentroForm 
          form={form}
          editId={editId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Box>

      {(!centros || centros.length === 0) ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No hay centros de atención registrados
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
          {centros.map(centro => (
            <Box
              key={centro.id}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%', lg: '1 1 22%' },
                maxWidth: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                minWidth: 260,
                display: 'flex',
              }}
            >
              <CentroCard
                centro={centro}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDetails={handleDetails}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Componente de detalle */}
      <DetalleCentro
        centro={detalleCentro}
        open={mostrarDetalle}
        onClose={() => setMostrarDetalle(false)}
      />
    </Box>
  );
}
