import { Container } from '@mui/material';
import {
  Routes,
  Navigate,
  Route,
  useLocation,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { AppBar } from './AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CreateAccount } from '../pages/UnAuthorized/CreateAccount';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProvideAuth, useAuth } from './auth';
import { Group } from '../pages/Authorized/SingleGroup';
import { Groups } from '../pages/Authorized/Groups';
import { Login } from '../pages/UnAuthorized/Login';
import { GoogleLogin } from '../pages/UnAuthorized/GoogleLogin';
import { httpInstance } from '../api/api';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Friends } from '../pages/Authorized/Friends';

const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
function ErrorFallback(props: FallbackProps) {
  const { error } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ProvideAuth>
            <CssBaseline />
            <Container
              sx={{
                paddingTop: '1em',
                paddingBottom: '1em',
                width: '100%',
                height: '92%',
                overflowY: 'auto',
              }}
              className="App"
            >
              <Routes>
                <Route path="create-account" element={<CreateAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="google">
                  <Route path="oauth2redirect" element={<GoogleLogin />} />
                </Route>
                <Route path="/" element={<AuthorizedApp />}>
                  <Route path="group/:id" element={<Group />} />
                  <Route path="friends" element={<Friends />} />
                  <Route index element={<Groups />} />
                </Route>
              </Routes>
            </Container>
          </ProvideAuth>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const AuthorizedApp = () => {
  return (
    <RequireAuth>
      <>
        <Outlet />
        <AppBar />
      </>
    </RequireAuth>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  httpInstance.interceptors.response.use(
    (v) => v,
    (err) => {
      const { status } = err.response;

      // If unauthorized logout and redirect to login page
      if (status === 401) {
        auth.signOut();
        navigate('/login', { state: { from: location } });
      }

      return Promise.reject(err);
    },
  );

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default App;
