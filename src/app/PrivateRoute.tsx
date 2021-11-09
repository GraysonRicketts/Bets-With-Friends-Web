import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from './auth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }