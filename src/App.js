import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
// Pages
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <Container fluid>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:userID" component={Detail} />
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
