import axios from 'axios';
import { SERVER_URL } from '../variables';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default axiosInstance;