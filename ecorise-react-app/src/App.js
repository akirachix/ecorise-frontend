
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignupForm from './Signup';
import PickupTable from './Pickup';
import MaterialTable from './Material';
import Sidebar from './shared-component/SideBar';
import PaymentForm from './Payment';
import Rewards from './Reward'
import Teaser from './Teaser';
import Feedback from './Feedback'
import Dashboard from './Dashboard';
import LoginScreen from './Login';


function App() {
   const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

  return (      
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />


       <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/reward" element={<Rewards />} />
            <Route path="/teaser" element={<Teaser />} />
            <Route path='/feedback' element={<Feedback />} />  
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/pickup" element={<PickupTable />} />
            <Route path="/material" element={<MaterialTable />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginScreen/>} />
            {}
          </Routes>
        </div>
      </div>
    </Router>
  )};


export default App;
