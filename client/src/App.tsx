import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss';
import AstronautControlPanel from './components/AstronautControlPanel';
import SolarSystemBackground from './components/SolarSystemBackground';

function App() {
  return (
    <div className='App'>
      <SolarSystemBackground />
      <AstronautControlPanel />
    </div>
  );
}

export default App;
