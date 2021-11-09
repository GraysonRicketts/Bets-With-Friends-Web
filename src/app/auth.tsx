import React, { useContext, useState } from 'react';
import { httpInstance } from '../api/http';

interface User {
  displayName: string;
}

export interface AuthContext {
  user: User;
  signIn: (displayName: string, token: string) => void;
  signOut: () => void;
}

const authContext = React.createContext<AuthContext>({
  user: {
    displayName: ''
  },
  signIn: () => {},
  signOut: () => {}
});

export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<User>({
    displayName: ''
  });
  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = (displayName: string, jwtToken: string) => {
    httpInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    setUser({
      displayName
    })
  };
  const signOut = () => {
    httpInstance.defaults.headers.common['Authorization'] = '';
    setUser({
      displayName: ''
    })
  };

  // Return the user object and auth methods
  return {
    user,
    signIn,
    signOut,
  };
}

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
