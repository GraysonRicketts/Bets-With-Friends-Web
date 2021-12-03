import axios from 'axios';

export const httpInstance = axios.create({
  baseURL: `${window.location.origin}/api/v1`,
});
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
httpInstance.defaults.timeout = 30000;
