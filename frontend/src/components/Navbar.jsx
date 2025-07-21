import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

export default function Navbar({ usuario, onLogout }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <PetsIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
            Adopciones IDPYBA
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/mascotas">Mascotas</Button>
        <Button color="inherit" component={Link} to="/centros">Centros</Button>
        {usuario && (
          <Button color="inherit" onClick={onLogout}>Cerrar sesión</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
