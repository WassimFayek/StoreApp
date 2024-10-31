import './styles/Header.css';
import React from 'react';
import logo from '../logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <h1 className="header-title">XYZ Store</h1>
    </header>
  );
};

export default Header;
