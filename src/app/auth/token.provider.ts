export interface AuthTokens {
  accessToken: string;
}

export interface TokenProvider {
  getToken: () => string | null;
  isLoggedIn: () => boolean;
  setToken: (token: AuthTokens | null) => void;
}

const TOKEN_KEY = 'REACT_TOKEN_AUTH';
export const createTokenProvider = (): TokenProvider => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  let _token: AuthTokens | null = storedToken && JSON.parse(storedToken);

  const setToken = (token: AuthTokens | null) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    } else {
      localStorage.removeItem(TOKEN_KEY);
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
