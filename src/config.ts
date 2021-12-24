type Environment = 'development' | 'test' | 'production';
export const NODE_ENV: Environment = process.env.NODE_ENV || 'development';