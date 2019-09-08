import React from 'react';
import { Link, Router } from '@reach/router';
import Home from './components/pages/Home';
import About from './components/pages/About';

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}
