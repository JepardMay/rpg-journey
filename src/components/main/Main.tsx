import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import Page from '../Page';

import { Logo } from '../icons/Logo';

import './main.css';

function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
          { isLoggedIn ||
            <NavLink to="/signup" className="main__btn btn">Start Now</NavLink>
          }
          { isLoggedIn &&
            <NavLink to="/profile" className="main__btn btn">Go To Dashboard</NavLink>
          }
        </div>
        <div className="container">
        </div>
      </div>
    </Page>
  );
}

export default Main;
