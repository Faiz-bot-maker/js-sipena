import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Penelitian from './pages/Penelitian';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/penelitian" element={<Layout><Penelitian /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
