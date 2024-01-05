import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from '@/pages/Signup';
import { HomePage } from '@/pages/HomePage';
import { NavBar } from '@/global/navbar';
import { Login } from '@/pages/Login';
import { Sidebar } from './global/sidebar';
import { Expenses } from './pages/expenses';
import { Dashboard } from './pages/Dashboard';
import { Incomes } from './pages/incomes';

function App() {
  const isUserLoggedIn = !!localStorage.getItem('token'); //check if user logged in successfully

  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* CssBaseline will reset the setting of MUI to default */}
        <CssBaseline />
        <div className='app'>
          {isUserLoggedIn && <Sidebar />}
          <main className='content'>
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
              {isUserLoggedIn && (
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/expenses' element={<Expenses />} />
                  <Route path='/incomes' element={<Incomes />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
