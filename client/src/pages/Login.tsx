import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`;
export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      const token = response.data.token; // Retrieves the token from the response data
      alert('Login successful'); // Shows an alert for successful login
      setPassword(''); // Clears the password field
      setUsername(''); // Clears the username field
      fetchUsers(); // Fetches user data
      console.log({ username, password });

      navigate('/account'); // Navigates to the '/account' route
      // window.location.reload(); // Make sure window reload
      localStorage.setItem('token', token); // Stores the token in local storage for future use
    } catch (error) {
      alert('Login error');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => console.log(res.data));
  };
  return (
    <Container>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{ width: '30%' }}
      >
        <TextField
          margin='normal'
          value={username}
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='name'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </Button>

        <Link href='/register' variant='body2'>
          Don't have an account? Sign Up
        </Link>
      </Box>
    </Container>
  );
};
