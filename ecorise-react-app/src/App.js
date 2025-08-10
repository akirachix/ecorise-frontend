import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import SignupForm from './Signup';
import PickupTable from './Pickup';
import MaterialTable from './Material';
import PaymentForm from './Payment';
import Rewards from './Reward';
import Teaser from './Teaser';
import Feedback from './Feedback';
import Dashboard from './Dashboard';
import LoginScreen from './Login';

import Sidebar from './shared-component/SideBar';

function AppContent() {
  const location = useLocation();
  const noSidebarRoutes = ['/login', '/signup','/teaser']; 
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
     

    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <div
        style={{
       flex: 1,
     
      minHeight: '100vh',
      boxSizing: 'border-box',
      marginRight: !hideSidebar ? '380px' : 0,
        }}
      >
        <Routes>
            <Route path="/" element={<Navigate to="/teaser" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/material" element={<MaterialTable />} />
          <Route path="/pickup" element={<PickupTable />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/reward" element={<Rewards />} />
          <Route path="/teaser" element={<Teaser />} />
          <Route path="/feedback" element={<Feedback />} /> 
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
