import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 10px;
`;
const LinkComponent = styled.div`
  display: flex;
  gap: 10px;
  text-decoration: none;
`;

export const NavBar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('homepage');

  return (
    <Container style={{ backgroundColor: palette.primary[800] }}>
      {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
      <Link
        to={'/'}
        style={{ textDecoration: 'none', color: palette.secondary[700] }}
      >
        <span>Penny Wise</span>
      </Link>
      <LinkComponent>
        <Link
          to='/login'
          onClick={() => setSelected('login')}
          style={{
            color: selected === 'login' ? 'inherit' : palette.grey[200],
            textDecoration: 'inherit',
          }}
        >
          Login
        </Link>
        <Link
          to='/register'
          onClick={() => setSelected('register')}
          style={{
            color: selected === 'register' ? 'inherit' : palette.grey[200],
            textDecoration: 'inherit',
          }}
        >
          Sign up
        </Link>
      </LinkComponent>
    </Container>
  );
};
