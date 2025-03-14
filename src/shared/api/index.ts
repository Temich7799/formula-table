import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://652f91320b8d8ddac0b2b62b.mockapi.io/', //FIXME: get it from env. TODO: Complete env setup
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
