import { fetchUsers, loginUser } from '@/state/api';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
} from '@mui/material';
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
      const token: string = await loginUser(username, password);
      alert('Login successful');
      setPassword('');
      setUsername('');
      fetchUsers();
      console.log({ username, password });
      navigate('/dashboard');
      window.location.reload();
      localStorage.setItem('token', token);
      // localStorage.setItem('userId', userId);
    } catch (error) {
      alert('Login error');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
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
