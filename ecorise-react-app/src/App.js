// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import PaymentPage from './Payment'

function App() {
  return (
    <Router>
      <Routes>
       
        
     
             
          <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
