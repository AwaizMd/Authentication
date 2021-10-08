import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import './Header.css';
import { Avatar } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication
          </Typography>


          <Link id="btn" href="/signup" color="inherit">
          <Button variant="contained"  color="secondary">Signup</Button>
          </Link>


          <Link id="btn" href="/login" color="inherit">
          <Button  variant="contained"  color="secondary">Login</Button>
          </Link>


          <Avatar id="profile" />

        </Toolbar>
      </AppBar>
    </Box>
  );
}
