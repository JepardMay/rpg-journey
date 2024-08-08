import React from 'react';
// import { NavLink } from 'react-router-dom';

import { Logo } from '../icons/Logo';

import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Logo></Logo>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
