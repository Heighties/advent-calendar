import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdventCalendar from './AdventCalendar/AdventCalendar'; // Correct import
import Home from './pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<AdventCalendar />} />
      </Routes>
    </Router>
  );
};

export default App;
