import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from '../components/Layout/Navbar/Navbar';
import HomePage from '../components/HomePage/HomePage';
import Footer from '../components/Layout/Footer/Footer';
import Course from '../components/Course/Course';
import About from '../components/About/About';
import Events from '../components/Events/Events';
import Event from '../components/Events/Event/Event';
import Login from '../components/Login/Login';
import Account from '../components/Account/Account';

import { carouselsLists } from './data';

function App(props) {
  return (
    <div className="App">
      <div className="content-wrap">
        <Navbar {...props} />
        <Switch>
          <Route
            path="/"
            exact
            default
            component={(props) => (
              <HomePage {...props} carouselsLists={carouselsLists} />
            )}
          />
          <Route path="/about" component={(props) => <About {...props} />} />
          <Route path="/login" component={(props) => <Login {...props} />} />

          <Route
            path="/account"
            component={(props) => <Account {...props} />}
          />
          <Route path="/courses" component={(props) => <Course {...props} />} />
          <Route
            path="/events"
            exact
            component={(props) => <Events {...props} />}
          />
          <Route
            path="/events/:id"
            component={(props) => <Event {...props} />}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
