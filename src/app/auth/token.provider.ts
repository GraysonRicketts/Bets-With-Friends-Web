export interface AuthTokens {
  accessToken: string;
} 

const TOKEN_KEY = 'REACT_TOKEN_AUTH';
export const createTokenProvider = () => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  let _token: AuthTokens | null = storedToken && JSON.parse(storedToken);

  const setToken = (token: AuthTokens | null) => {
    if (token) {
      localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    } else {
      localStorage.removeItem('REACT_TOKEN_AUTH');
    }
    _token = token;
  };

  const getToken = () => {
    if (!_token) {
      return null;
    }

    return _token && _token.accessToken;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
  };
};

