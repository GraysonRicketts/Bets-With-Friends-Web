import { Home } from '../pages/Authorized/Home';
import { Container } from '@mui/material';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Group } from '../pages/Authorized/Group';
import { AppBar } from './AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CreateAccount } from '../pages/UnAuthorized/CreateAccount';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/group/:id">
            <Group />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
      <AppBar />
    </ThemeProvider>
  );
}

export default App;
