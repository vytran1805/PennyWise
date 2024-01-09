// axiosService.ts

import axios, { AxiosResponse } from 'axios';

const axiosService = axios.create({
  baseURL: 'http://localhost:3001/api/auth',
  // You can set common headers or configurations here if needed
});

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response: AxiosResponse<{ token: string }> = await axiosService.post(
      '/login',
      {
        username,
        password,
      }
    );
    return response.data.token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const fetchUsers = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosService.get('/register');
    return response.data;
  } catch (error) {
    throw new Error('Fetching users failed');
  }
};

export const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<void> => {
  try {
    await axiosService.post('/register', { email, username, password });
  } catch (error) {
    throw new Error('Unable to register user');
  }
};
