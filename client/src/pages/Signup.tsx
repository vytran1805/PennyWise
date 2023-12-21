import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`;
const Signup = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent the page from refreshing after hitting submit
    const data = new FormData(event.currentTarget);
    // const email = data.get('email') ?? '';
    // const username = data.get('username');
    // const password = data.get('password');
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    axios
      .post('http://localhost:3001/register', { email, username, password })
      .then(() => {
        setEmail('');
        setUsername('');
        setPassword('');
        console.log('submitted');
      })
      .catch((error) => {
        console.log('Unable to register user', error);
      });
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
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='name'
          autoFocus
        />
        <TextField
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          name='password'
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
          Sign up
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
