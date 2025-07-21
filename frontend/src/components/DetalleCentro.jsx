import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Business,
  Close
} from '@mui/icons-material';

export default function DetalleCentro({ centro, open, onClose }) {
  if (!centro) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Box display="flex" alignItems="center">
          <Business sx={{ mr: 2, color: '#667eea', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#222' }}>
            {centro.nombre}
          </Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Imagen del centro */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: 250,
                borderRadius: 2,
                background: centro.foto 
                  ? `url(${centro.foto}) center/cover`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {!centro.foto && (
                <Box textAlign="center">
                  <Business sx={{ fontSize: 60, opacity: 0.8, mb: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Sin imagen disponible
                  </Typography>
                </Box>
              )}
              <Chip
                label="Centro de Atención"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Grid>

          {/* Información del centro */}
          <Grid item xs={12} md={7}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222', mb: 3 }}>
                Información del Centro
              </Typography>

              <Grid container spacing={2}>
                {/* Ubicación */}
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#667eea', mr: 2, width: 40, height: 40 }}>
                      <LocationOn />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        Ubicación
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#222' }}>
                        {centro.ubicacion || 'No especificada'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Teléfono */}
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#4caf50', mr: 2, width: 40, height: 40 }}>
                      <Phone />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        Teléfono
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#222' }}>
                        {centro.telefono || 'No especificado'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#ff9800', mr: 2, width: 40, height: 40 }}>
                      <Email />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#222' }}>
                        {centro.email || 'No especificado'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Horario */}
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#9c27b0', mr: 2, width: 40, height: 40 }}>
                      <AccessTime />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        Horario de Atención
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#222' }}>
                        {centro.horario || 'No especificado'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Información adicional */}
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
                  Este centro está disponible para atención veterinaria y adopción de mascotas.
                  Contacta directamente para más información sobre servicios y disponibilidad.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd8' },
            borderRadius: 2,
            px: 3
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
} 