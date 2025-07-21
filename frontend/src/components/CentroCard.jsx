import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import { LocationOn, Phone, Email, AccessTime } from '@mui/icons-material';

export default function CentroCard({ centro, onEdit, onDelete, onDetails }) {
  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(60,60,60,0.08)',
      background: '#fff',
      overflow: 'hidden',
      border: '1px solid #f0f0f0',
      transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: '0 8px 32px rgba(60,60,60,0.16)'
      }
    }}>
      {/* Header con foto o icono */}
      <Box
        sx={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: centro.foto 
            ? `url(${centro.foto}) center/cover`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative'
        }}
      >
        {!centro.foto && <LocationOn sx={{ fontSize: 60, opacity: 0.8 }} />}
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

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222', mb: 1 }}>
          {centro.nombre}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Box display="flex" alignItems="center" mb={0.5}>
            <LocationOn sx={{ mr: 1, fontSize: 16, color: '#667eea' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {centro.ubicacion}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" mb={0.5}>
            <Phone sx={{ mr: 1, fontSize: 16, color: '#667eea' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {centro.telefono}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" mb={0.5}>
            <Email sx={{ mr: 1, fontSize: 16, color: '#667eea' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {centro.email}
            </Typography>
          </Box>
          
          {centro.horario && (
            <Box display="flex" alignItems="center">
              <AccessTime sx={{ mr: 1, fontSize: 16, color: '#667eea' }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {centro.horario}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, pt: 0 }}>
        <Button size="small" variant="outlined" onClick={() => onDetails(centro)}>
          Detalles
        </Button>
        <Box>
          {onEdit && (
            <Button size="small" onClick={() => onEdit(centro)} sx={{ mr: 1 }}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button size="small" color="error" onClick={() => onDelete(centro.id)}>
              Eliminar
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
} 