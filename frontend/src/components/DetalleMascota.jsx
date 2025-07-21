import { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Box, Button, Grid, Chip, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close, Pets, LocationOn, Info, MedicalServices } from '@mui/icons-material';
import axios from 'axios';

export default function DetalleMascota({ mascota, centros, onClose, open }) {
  const [ficha, setFicha] = useState(null);

  useEffect(() => {
    if (open && mascota) {
      axios.get(`http://localhost:3001/api/mascotas/${mascota.id}/ficha`)
        .then(res => setFicha(res.data))
        .catch(() => setFicha(null));
    }
  }, [mascota?.id, open]);

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'disponible': return 'success';
      case 'adoptado': return 'default';
      case 'en tratamiento': return 'warning';
      default: return 'primary';
    }
  };

  const centro = centros?.find(c => c.id === mascota?.id_centro);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Pets sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Detalles de {mascota?.nombre}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {mascota && (
          <Grid container spacing={3}>
            {/* Foto de la mascota */}
            <Grid item xs={12} md={4}>
              {mascota.foto ? (
                <Card>
                  <CardMedia 
                    component="img" 
                    height="300" 
                    image={mascota.foto} 
                    alt={mascota.nombre}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              ) : (
                <Box 
                  height={300} 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  bgcolor="grey.100"
                  borderRadius={1}
                >
                  <Pets sx={{ fontSize: 80, color: 'grey.400' }} />
                </Box>
              )}
            </Grid>
            
            {/* Información de la mascota */}
            <Grid item xs={12} md={8}>
              <Box mb={2}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {mascota.nombre}
                </Typography>
                <Chip 
                  label={mascota.estado || 'Sin estado'} 
                  color={getEstadoColor(mascota.estado)}
                  sx={{ mb: 2 }}
                />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <Pets sx={{ mr: 1, fontSize: 16 }} />
                    Especie
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {mascota.especie}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Raza
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {mascota.raza}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Edad
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {mascota.edad} años
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Sexo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {mascota.sexo}
                  </Typography>
                </Grid>
              </Grid>
              
              {mascota.descripcion && (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Info sx={{ mr: 1, fontSize: 16 }} />
                    Descripción
                  </Typography>
                  <Typography variant="body1">
                    {mascota.descripcion}
                  </Typography>
                </Box>
              )}
              
              {centro && (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                    Centro de Atención
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {centro.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {centro.ubicacion}
                  </Typography>
                </Box>
              )}
              
              {/* Ficha Médica */}
              <Box mt={3}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <MedicalServices sx={{ mr: 1, color: 'primary.main' }} />
                  Ficha Médica
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {ficha ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Detalles Médicos
                      </Typography>
                      <Typography variant="body1">
                        {ficha.detalles || 'Sin detalles médicos'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Vacunas
                      </Typography>
                      <Typography variant="body1">
                        {ficha.vacunas || 'Sin registro de vacunas'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Próximas Citas
                      </Typography>
                      <Typography variant="body1">
                        {ficha.citas || 'Sin citas programadas'}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography color="text.secondary">
                    No hay ficha médica registrada para esta mascota.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
