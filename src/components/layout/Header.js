import React from 'react';
import { Link } from '@reach/router';
import './header.css';

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: 'a-active' } : null;

const NavLink = props => <Link getProps={isActive} {...props} />;

export default function Header() {
  return (
    <nav className="nav-bar">
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
    </nav>
  );
}
