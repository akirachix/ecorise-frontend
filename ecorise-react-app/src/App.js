import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Signup';
import PickupTable from './Pickup';
import MaterialTable from './Material';



function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        
       
          <Route path="signup" element={<SignupForm />} />
          <Route path="/pickup" element={<PickupTable />} />
          <Route path="material" element={<MaterialTable />} />
       
      </Routes>
    </Router>
  );
}

export default App;
