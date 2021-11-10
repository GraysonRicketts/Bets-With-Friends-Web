import { Container } from '@mui/material';
import { Routes, Navigate, Route, useLocation, Outlet } from 'react-router-dom';
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

const theme = createTheme();
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <CssBaseline />
          <Container
            sx={{
              paddingTop: '1em',
              paddingBottom: '1em',
              width: '100%',
            }}
            className="App"
          >
            <Routes>
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<AuthorizedApp />}>
                <Route path="group/:id" element={<Groups />}>
                  <Route index element={<>group page</>} />
                  <Route path="bets" element={<PlacedBets />} />
                  <Route path="categories" element={<CategorizedBets />} />
                  <Route path="score" element={<ScoreScreen />} />
                </Route>
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
      </QueryClientProvider>
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
  let auth = useAuth();
  let location = useLocation();

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
