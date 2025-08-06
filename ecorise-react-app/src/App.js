import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';



import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './shared-component/SideBar';
import PaymentForm from './Payment';
import Rewards from './Reward'
import Teaser from './Teaser';
import Feedback from './Feedback'

function App() {
  return (

    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/reward" element={<Rewards />} />
            <Route path="/teaser" element={<Teaser />} />
            <Route path='/feedback' element={<Feedback />} />  
            {}
          </Routes>
        </div>
      </div>
    </Router>
  )};




export default App;
