import React, { useContext, useState } from 'react';
import { httpInstance } from '../../api/http';
import { User } from '../../interfaces';
import { createTokenProvider } from './token.provider';
import { createUserProvider } from './user.provider';



export interface AuthContext {
  user: User | null;
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

// Provider hook that creates auth object and handles state
function useProvideAuth(): AuthContext {
  const userProvider = createUserProvider();
  const storedUser = userProvider.getUser();
  const [state, setState] = useState<{ user: User | null }>({ user: storedUser });
  
  const tokenProvider = createTokenProvider();

  const signIn = (id: string, displayName: string, jwtToken: string) => {
    // Add the token on requests
    httpInstance.interceptors.request.use((config) => {
      const headers = config?.headers;
      if (headers) {
        headers['Authorization'] = `Bearer ${jwtToken}`
      }

      return config;
    })

    setState({user:{
      id,
      name: displayName
    }})
    tokenProvider.setToken({ accessToken: jwtToken });
    userProvider.setUser({ id, name: displayName })
  };

  const signOut = () => {
    // Remove the token from requests
    httpInstance.interceptors.request.use((config) => {
      const headers = config?.headers;
      if (headers && headers['Authorization']) {
        headers['Authorization'] = '';
      }

      return config;
    })

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
