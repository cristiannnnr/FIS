import { Box, TextField, Button, Paper, Typography, Grid } from '@mui/material';
import { Add, Edit, Cancel } from '@mui/icons-material';

export default function CentroForm({ form, editId, onChange, onSubmit, onCancel }) {
  return (
    <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {editId ? <Edit sx={{ mr: 1 }} /> : <Add sx={{ mr: 1 }} />}
        {editId ? 'Editar Centro' : 'Agregar Nuevo Centro'}
      </Typography>
      
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="nombre" 
              label="Nombre del Centro" 
              value={form.nombre} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="telefono" 
              label="Teléfono" 
              value={form.telefono} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="email" 
              label="Email" 
              type="email"
              value={form.email} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="ubicacion" 
              label="Ubicación" 
              value={form.ubicacion} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="horario" 
              label="Horario de Atención" 
              value={form.horario} 
              onChange={onChange} 
              fullWidth
              variant="outlined"
              placeholder="Ej: Lunes a Viernes 8:00-18:00"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="foto" 
              label="URL de la Foto" 
              value={form.foto} 
              onChange={onChange} 
              fullWidth
              variant="outlined"
              placeholder="https://ejemplo.com/foto.jpg"
              helperText="Opcional: URL de una imagen del centro"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              {editId && (
                <Button 
                  type="button" 
                  onClick={onCancel}
                  variant="outlined"
                  startIcon={<Cancel />}
                >
                  Cancelar
                </Button>
              )}
              <Button 
                type="submit" 
                variant="contained"
                startIcon={editId ? <Edit /> : <Add />}
                size="large"
              >
                {editId ? 'Guardar Cambios' : 'Agregar Centro'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
