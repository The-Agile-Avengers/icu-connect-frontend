import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CoursePage from './pages/CoursePage';
import Navbar from './components/Navbar/Navbar';

function Copyright() {
  return (
    <Typography variant="body2" color='black' align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}


export default function App() {
  const drawerWidth = 220; 
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <CoursePage/>
    </Box>
  );
}

/*
export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <SignUp/>
      </Box>
    </Container>
  );
}*/