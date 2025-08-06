import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginScreen from './Login';


function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/" element={<LoginScreen/>} />
    </Routes>
  );
}

export default App;
