type Environment = 'development' | 'test' | 'staging' | 'production';
export const NODE_ENV: Environment = process.env.NODE_ENV;