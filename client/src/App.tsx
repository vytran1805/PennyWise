import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from '@/pages/Signup';
import { NavBar } from '@/global/navbar';
import { Login } from '@/pages/Login';
import { Sidebar } from './global/sidebar';
import { Expenses } from './pages/expenses';
import { Dashboard } from './pages/dashboard';
import { Incomes } from './pages/incomes';
import { Budget } from './pages/budget';
import { Settings } from './pages/settings';

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
              {/* <Route path='/' element={<HomePage />} /> */}
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
              {isUserLoggedIn && (
                <>
                  <Route path='/dashboard/*' element={<Dashboard />} />
                  {/* when the URL matches the pattern /expense/*, the <Expenses /> component will be rendered */}
                  <Route path='/expenses/*' element={<Expenses />} />
                  <Route path='/incomes/*' element={<Incomes />} />
                  <Route path='/budget/*' element={<Budget />} />
                  <Route path='/settings/*' element={<Settings />} />
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
