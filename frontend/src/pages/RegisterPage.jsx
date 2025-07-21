import Register from '../Register';
import { Box } from '@mui/material';

export default function RegisterPage({ onRegister }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Register onRegister={onRegister} />
    </Box>
  );
}
