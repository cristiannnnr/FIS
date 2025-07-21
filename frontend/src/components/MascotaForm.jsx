import { Box, TextField, Select, MenuItem, Button, Paper, Typography, Grid, FormControl, InputLabel } from '@mui/material';
import { Add, Edit, Cancel } from '@mui/icons-material';

export default function MascotaForm({ form, centros, editId, onChange, onSubmit, onCancel }) {
  return (
    <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {editId ? <Edit sx={{ mr: 1 }} /> : <Add sx={{ mr: 1 }} />}
        {editId ? 'Editar Mascota' : 'Agregar Nueva Mascota'}
      </Typography>
      
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="nombre" 
              label="Nombre" 
              value={form.nombre} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="especie" 
              label="Especie" 
              value={form.especie} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="raza" 
              label="Raza" 
              value={form.raza} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              name="edad" 
              label="Edad (años)" 
              type="number" 
              value={form.edad} 
              onChange={onChange} 
              required 
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, max: 30 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Sexo</InputLabel>
              <Select 
                name="sexo" 
                value={form.sexo} 
                onChange={onChange}
                label="Sexo"
              >
                <MenuItem value="Macho">Macho</MenuItem>
                <MenuItem value="Hembra">Hembra</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Estado</InputLabel>
              <Select 
                name="estado" 
                value={form.estado} 
                onChange={onChange}
                label="Estado"
              >
                <MenuItem value="Disponible">Disponible</MenuItem>
                <MenuItem value="Adoptado">Adoptado</MenuItem>
                <MenuItem value="En Tratamiento">En Tratamiento</MenuItem>
                <MenuItem value="Reservado">Reservado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Centro de Atención</InputLabel>
              <Select 
                name="id_centro" 
                value={form.id_centro} 
                onChange={onChange}
                label="Centro de Atención"
              >
                <MenuItem value="">Selecciona un centro</MenuItem>
                {centros?.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.nombre} - {c.ubicacion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              name="foto" 
              label="URL de la Foto" 
              value={form.foto} 
              onChange={onChange} 
              fullWidth
              variant="outlined"
              placeholder="https://ejemplo.com/foto.jpg"
              helperText="Opcional: URL de una imagen de la mascota"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              name="descripcion" 
              label="Descripción" 
              value={form.descripcion} 
              onChange={onChange} 
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Describe las características, personalidad, necesidades especiales..."
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
                {editId ? 'Guardar Cambios' : 'Agregar Mascota'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
