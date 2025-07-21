import Login from '../Login';
import { Box } from '@mui/material';

export default function LoginPage({ onLogin }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Login onLogin={onLogin} />
    </Box>
  );
}
