import axios from 'axios';
import { API_URI } from '../config';

const uri = API_URI || window.location.origin;

export const httpInstance = axios.create({
  baseURL: `${uri}/api/v1`,
});
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
httpInstance.defaults.timeout = 30000;
