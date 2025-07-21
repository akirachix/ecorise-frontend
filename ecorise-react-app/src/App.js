// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Sidebar from "./shared-componenet/SideBar"

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/sidebar" element={<Navigation />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;
