// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Teaser from './TeaserPage';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teaser" element={<Teaser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
