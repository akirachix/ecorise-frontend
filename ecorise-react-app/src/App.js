// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navigation from "./pages/shared-folder/Navigation/Sidebar"

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/navigation" element={<Navigation />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;
