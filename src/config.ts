type Environment = 'development' | 'test' | 'production';
export const NODE_ENV: Environment = process.env.NODE_ENV || 'development';
export const GOOGLE_AUTH_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
export const GOOGLE_AUTH_REDIRECT_URL =
  process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL;
export const API_URL = process.env.URL || 'http://localhost:5000';
