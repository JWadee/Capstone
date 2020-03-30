import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import HomePage from './components/pages/HomePage';
import LandingPage from './components/pages/LandingPage';
import SignUp from './components/pages/signup/SignUp';
import LogIn from './components/pages/LogIn';
import Test from './components/pages/Test';
import JesseTest from './components/pages/JesseTest';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
