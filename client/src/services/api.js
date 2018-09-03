import axios from 'axios';

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.response.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default axiosInstance;
