
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import "./App.css";

function App() {


  return (
    <Router>
    
          <Routes>
            <Route path="/" element={<ForgotPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />

          </Routes>
    </Router>
  );
}

export default App;
