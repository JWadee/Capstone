import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';

//Components
import TrainerPage from './components/pages/trainer/TrainerPage';
import LandingPage from './components/pages/LandingPage';
import SignUp from './components/pages/signup/SignUp';
import LogIn from './components/pages/LogIn';
import Test from './components/pages/Test';
import JesseTest from './components/pages/JesseTest';
import MayraTest from './components/pages/Mayratest';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route path="/trainer" component={TrainerPage} />
          <Route path="/JesseTest" component={JesseTest} />
          <Route exact path="/Mayra" component={MayraTest} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
