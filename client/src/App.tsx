import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss';
import AstronautControlPanel from './components/AstronautControlPanel';
import Navigation from './components/Navigation';
import SolarSystemBackground from './components/SolarSystemBackground';

function App() {
  return (
    <div className='App'>
      <SolarSystemBackground />
      {/* <Navigation /> */}
      <AstronautControlPanel />
    </div>
  );
}

export default App;
