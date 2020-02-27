import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//Components
import TrainerPage from './components/pages/trainer/TrainerPage';
import SignUp from './components/SignUp';
function App() {
  return (
    <div className="App">
      <SignUp />
      {/* <TrainerPage /> */}
    </div>
  );
}

export default App;
