
import Dashboard  from "./Dashboard";
import LoginScreen from "./Login";


import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './shared-component/SideBar';
import PaymentForm from './Payment';
import Rewards from './Reward'


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/reward" element={<Rewards />} />
            {}
          </Routes>
        </div>
      </div>
    </Router>

// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Teaser from './Teaser';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/login" element = {<LoginScreen/>}/>

        <Route path="/teaser" element={<Teaser />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;