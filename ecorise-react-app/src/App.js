// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import PaymentPage from './Payment'

function App() {

import Teaser from './Teaser';
const App = () => {

  return (
    <BrowserRouter>
      <Routes>

       
        
     
             
          <Route path="/payment" element={<PaymentPage />} />

        <Route path="/teaser" element={<Teaser />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
