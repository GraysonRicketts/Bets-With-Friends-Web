import { Container } from '@mui/material';
import { Routes, Navigate, Route, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { AppBar } from './AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CreateAccount } from '../pages/UnAuthorized/CreateAccount';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProvideAuth, useAuth } from './auth';
import { Groups } from '../pages/Authorized/Group';
import { Home } from '../pages/Authorized/Home';
import { Login } from '../pages/UnAuthorized/Login';
import { PlacedBets } from '../pages/Authorized/Group/PlacedBets';
import { CategorizedBets } from '../pages/Authorized/Group/CategorizedBets';
import { ScoreScreen } from '../pages/Authorized/Group/ScoreScreen';
import { httpInstance } from '../api/http';
import {ErrorBoundary, FallbackProps} from 'react-error-boundary';
import { ReactQueryDevtools } from 'react-query/devtools'
import { Friends } from '../pages/Authorized/Friends';

const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
  }
})
;

function ErrorFallback(props: FallbackProps) {
  const { error }= props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
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
              overflowY: 'auto'
            }}
            className="App"
          >
            <Routes>
              <Route path="create-account" element={<CreateAccount />} />
              <Route path="login" element={<Login />} />
              <Route path="/" element={<AuthorizedApp />}>
                <Route path="group/:id" element={<Groups />}>
                  <Route index element={<>group page</>} />
                  <Route path="bets" element={<PlacedBets />} />
                  <Route path="categories" element={<CategorizedBets />} />
                  <Route path="score" element={<ScoreScreen />} />
                </Route>
                <Route path="friends" element={<Friends />}/>
                <Route index element={<Home />} />
              </Route>

              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>Page not found</p>
                  </main>
                }
              />
            </Routes>
          </Container>
        </ProvideAuth>
        <ReactQueryDevtools initialIsOpen={false} />
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
  const navigate = useNavigate()
  const location = useLocation();

  httpInstance.interceptors.response.use((v) => v, (err) => {
    const {status} = err.response;

    // If unauthorized logout and redirect to login page
    if (status === 401) {
      auth.signOut();
      navigate('/login', { state: { from: location }})
    }
    
    
    return Promise.reject(err);
  })

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
