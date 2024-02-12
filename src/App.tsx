import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dashboard from './pages/Dashboard'
import Consumers from './pages/Consumers';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Appbar } from './components/Appbar';
import { Drawer } from './components/Drawer';

function App() {
  const defaultTheme = createTheme();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <Appbar open={open} toggleFunction={toggleDrawer} />
          <CssBaseline />
          <Drawer open={open} toggleFunction={toggleDrawer} />

          <Routes>
            <Route path='/' element={<  Dashboard />} />
            <Route path='/consumers' element={<Consumers />} />
          </Routes>
        </Box>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
