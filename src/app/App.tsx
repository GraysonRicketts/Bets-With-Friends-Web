import { Container } from '@mui/material';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { AppBar } from './AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CreateAccount } from '../pages/UnAuthorized/CreateAccount';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProvideAuth } from './auth';
import { PrivateRoute } from './PrivateRoute';
import { Group } from '../pages/Authorized/Group';
import { Home } from '../pages/Authorized/Home';

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
            <Switch>
              <Route path="/create-account">
                <CreateAccount />
              </Route>
              <PrivateRoute path="/group/:id">
                <Group />
              </PrivateRoute>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
            </Switch>
          </Container>
          <AppBar />
        </ProvideAuth>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
