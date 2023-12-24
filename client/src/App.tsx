import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '@/pages/Signup';
import Account from '@/pages/Account';
import { HomePage } from '@/pages/HomePage';
import { NavBar } from '@/components/Navbar';
import { Login } from '@/pages/Login';

function App() {
  const isUserLoggedIn = !!localStorage.getItem('token'); //check if user logged in successfully

  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline will reset the setting of MUI to default */}
          <CssBaseline />
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            {isUserLoggedIn && <Route path='/account' element={<Account />} />}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
