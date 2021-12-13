import React, { useContext, useState } from 'react';
import { httpInstance } from '../../api/http';
import { SimpleUser } from 'src/api/user';
import { createTokenProvider } from './token.provider';
import { createUserProvider } from './user.provider';



export interface AuthContext {
  user: SimpleUser | null;
  signIn: (id: string, displayName: string, token: string) => void;
  signOut: () => void;
}

const authContext = React.createContext<AuthContext>({
  user: null,
  signIn: () => {},
  signOut: () => {}
});

export const useAuth = () => {
  return useContext(authContext);
};

function setBearerToken(token:string ): void {
  httpInstance.interceptors.request.use((config) => {
    const headers = config?.headers;
    if (headers) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return config;
  })
}

// Provider hook that creates auth object and handles state
function useProvideAuth(): AuthContext {
  const userProvider = createUserProvider();
  const storedUser = userProvider.getUser();
  const [state, setState] = useState<{ user: SimpleUser | null }>({ user: storedUser });
  
  const tokenProvider = createTokenProvider();
  const savedToken = tokenProvider.getToken();
  if (savedToken) {
    setBearerToken(savedToken)
  }

  const signIn = (id: string, displayName: string, jwtToken: string) => {
    // Add the token on requests
    setBearerToken(jwtToken)

    setState({user:{
      id,
      name: displayName
    }})
    tokenProvider.setToken({ accessToken: jwtToken });
    userProvider.setUser({ id, name: displayName })
  };

  const signOut = () => {
    // Remove the token from requests
    setBearerToken('');

    setState({ user: null })
    tokenProvider.setToken(null)
    userProvider.setUser(null)
  };

  // Return the user object and auth methods
  return {
    user: state.user || null,
    signIn,
    signOut,
  };
}

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
