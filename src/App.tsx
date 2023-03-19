import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import SignIn from './components/LoginForm';
import SignUp from './components/SignUpForm';
import CoursePage from './pages/CoursePage';
import Navbar from './components/Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


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