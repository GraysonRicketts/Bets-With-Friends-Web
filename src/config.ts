type Environment = 'development' | 'test' | 'staging' | 'production';
export const NODE_ENV: Environment = process.env.NODE_ENV;

export const API_URI = process.env.REACT_APP_API_URI;