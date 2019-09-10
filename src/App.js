import React from 'react';
import { Router } from '@reach/router';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}
