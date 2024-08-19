import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Page from '../Page';

import { Logo } from '../icons/Logo';

import './main.css';

function Main() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Sign component must be used within an AuthProvider');
  }

  const { isLoggedIn } = authContext;

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
