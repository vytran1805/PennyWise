import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material';

const Container = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
const LinkComponent = styled.div`
  display: flex;
  gap: 10px;
  text-decoration: none;
`;
// TODO add css when click on the link item
export const NavBar = () => {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const { palette } = useTheme();
  // const [selected, setSelected] = useState('homepage');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
    console.log('removed');
  };

  /**
   * If user is signed in, render Account and Logout component
   * @returns JSX component
   */
  const handleUserSignedIn = () => {
    return (
      <>
        <Link
          to='/dashboard'
          // onClick={handleSignOut}
          style={{
            // color: selected === 'login' ? 'inherit' : palette.grey[200],
            textDecoration: 'inherit',
            color: palette.grey[700],
          }}
        >
          Account
        </Link>
        <Link
          to='/'
          onClick={handleSignOut}
          style={{
            // color: selected === 'login' ? 'inherit' : palette.grey[200],
            textDecoration: 'inherit',
            color: palette.grey[700],
          }}
        >
          Log out
        </Link>
      </>
    );
  };

  /**
   * If user is signed out, render Login and Signup component
   * @returns JSX component
   */
  const handleUserSignedOut = () => {
    return (
      <>
        <Link
          to='/login'
          // onClick={() => setSelected('login')}
          style={{
            // color: selected === 'login' ? 'inherit' : palette.grey[200],
            textDecoration: 'inherit',
            color: palette.grey[700],
          }}
        >
          Log in
        </Link>
        <Link
          to='/register'
          // onClick={() => setSelected('register')}
          style={{
            // color: selected === 'register' ? 'inherit' : palette.grey[200],
            textDecoration: 'none',
            color: palette.grey[700],
          }}
        >
          Sign up
        </Link>
      </>
    );
  };

  return (
    <Container>
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
        style={{
          textDecoration: 'none',
          color: palette.secondary.dark,
          fontSize: 22,
        }}
      >
        <strong>Penny Wise</strong>
      </Link>
      <LinkComponent>
        {isUserLoggedIn ? handleUserSignedIn() : handleUserSignedOut()}
      </LinkComponent>
    </Container>
  );
};
