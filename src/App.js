import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
// Pages
import Home from './pages/Home';
import Detail from './pages/Detail';
// import ImageGallery from './pages/ImageGallery';
// import ImageGalleryDetail from './pages/ImageGalleryDetail';

function App() {
  return (
    <Container fluid>
      <Router>
        {/* <nav>
        <ul>
          <li>
            <Link to="/">Users</Link>
          </li>
          <li>
            <Link to="/image_gallery">User Detail</Link>
          </li>

        </ul>
      </nav> */}
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:userID" component={Detail} />
            {/* <Route exact path="/image_gallery" component={ImageGallery} />
          <Route path="/image_gallery/:photo_id" component={ImageGalleryDetail} /> */}
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
