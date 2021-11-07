import axios from 'axios';
import { API_BASE_URL } from '../config';

export const httpInstance = axios.create({
  baseURL: API_BASE_URL,
});
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
httpInstance.defaults.timeout = 30000;
