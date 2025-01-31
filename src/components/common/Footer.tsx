import React from 'react';

import { Logo } from '../icons';

import '../../assets/styles/components/footer.css';

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
