import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">Elderly Private Care</Link>
      </h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/search">Search Professionals</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
