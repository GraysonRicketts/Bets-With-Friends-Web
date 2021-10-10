import { Home } from "../pages/Home";
import { Container } from '@mui/material';
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { Group } from "../pages/Group";
import { AppBar } from "./AppBar";

function App() {
  return (
    <>
      <Container
        sx={{
          paddingTop: "1em",
          paddingBottom: "1em",
          width: "100%",
        }}
        className="App"
      >
        <Switch>
          <Route path="/group/:id">
            <Group />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Container>
      <AppBar />
    </>
  );
}

export default App;
