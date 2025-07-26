import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard  from "./Dashboard";
import LoginScreen from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element = {<Dashboard/>}/>
        <Route path="/" element = {<LoginScreen/>}/>

      </Routes>
    </Router>
  );
}

export default App;