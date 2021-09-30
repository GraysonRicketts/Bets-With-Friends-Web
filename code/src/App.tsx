import { Groups } from "./pages/Groups";
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Container sx={{
        paddingTop: '1em',
        paddingBottom: '1em'
      }}>
        <Groups></Groups>
      </Container>
    </div>
  );
}

export default App;
