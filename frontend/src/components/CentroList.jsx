import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export default function CentroList({ centros }) {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Centros de Atención</Typography>
      <List>
        {centros.map(c => (
          <ListItem key={c.id} divider>
            <ListItemText primary={c.nombre} secondary={`${c.ubicacion} - ${c.contacto}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
