import React from 'react';
import { NavLink } from 'react-router-dom';

import Page from '../Page';

import { Logo } from '../icons/Logo';

import './main.css';

function Main() {
  return (
    <Page title="WELCOME TO JOURNEY" isNoLogo={true}>
      <div className="main">
        <div className="main__hero">
          <h1 className="main__title title title--xl">
            <span>Welcome To </span>
            <span className="main__logo">
              <Logo></Logo>
            </span>
            <span> -&nbsp;Your Tool to&nbsp;Gamifying Your Life</span>
          </h1>
          <NavLink to="/signup" className="main__btn btn">Start Now</NavLink>
        </div>
        <div className="container">
        </div>
      </div>
    </Page>
  );
}

export default Main;
