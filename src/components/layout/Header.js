import React from 'react';
import { Link } from '@reach/router';
import './header.css';

export default function Header() {
  return (
    <nav className="nav-bar">
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
    </nav>
  );
}
