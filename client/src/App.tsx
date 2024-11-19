import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss';
import AstronautControlPanel from './components/AstronautControlPanel';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='App'>
      <h1>Control panel - mission Mars</h1>
      <Navigation />
      <AstronautControlPanel />
    </div>
  );
}

export default App;
