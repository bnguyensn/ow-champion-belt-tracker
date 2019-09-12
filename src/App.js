import React, { useState } from 'react';
import { Router } from '@reach/router';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Header from './components/layout/Header';

export default function App() {
  const [championReport, setChampionReport] = useState(null);

  return (
    <div className="app">
      <Header />
      <Router>
        <Home
          path="/"
          championReport={championReport}
          setChampionReport={setChampionReport}
        />
        <About path="/about" />
      </Router>
    </div>
  );
}
