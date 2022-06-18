import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import CashflowAdmin from './pages/CashflowAdmin';
import CashflowLogin from './pages/CashflowLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CashflowLogin />} />
        <Route path='/admin' element={<CashflowAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
