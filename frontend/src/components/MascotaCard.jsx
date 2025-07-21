import { Card, CardContent, CardActions, CardMedia, Typography, Button, Box } from '@mui/material';
import { Pets } from '@mui/icons-material';

export default function MascotaCard({ mascota, onEdit, onDelete, onDetails }) {
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
      {/* Imagen */}
      {mascota.foto ? (
        <CardMedia
          component="img"
          height="200"
          image={mascota.foto}
          alt={mascota.nombre}
          sx={{ objectFit: 'cover', borderBottom: '1px solid #f0f0f0' }}
        />
      ) : (
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ background: '#f5f6fa', color: '#bbb', borderBottom: '1px solid #f0f0f0' }}
        >
          <Pets sx={{ fontSize: 60 }} />
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222', mb: 1 }}>
          {mascota.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
          {mascota.especie} • {mascota.raza}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', mb: 0.5 }}>
          Edad: {mascota.edad} años • {mascota.sexo}
        </Typography>
        {mascota.descripcion && (
          <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', mt: 1, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {mascota.descripcion}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, pt: 0 }}>
        <Button size="small" variant="outlined" onClick={() => onDetails(mascota)}>
          Detalles
        </Button>
        <Box>
          {onEdit && (
            <Button size="small" onClick={() => onEdit(mascota)} sx={{ mr: 1 }}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button size="small" color="error" onClick={() => onDelete(mascota.id)}>
              Eliminar
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
