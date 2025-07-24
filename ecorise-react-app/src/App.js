import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        {}
        <Route path="/" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;