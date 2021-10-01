import { Home } from "./pages/Home";
import { Container } from '@mui/material';
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { Group } from "./pages/Group";

function App() {
  return (
    <div className="App">
      <Container sx={{
        paddingTop: '1em',
        paddingBottom: '1em'
      }}>
        <Switch>

        <Route path="/group/:id"><Group/></Route>
        <Route exact path="/"><Home></Home></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
