import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import Page from '../common/Page';

import { Logo } from '../icons';

import '../../assets/styles/components/main.css';

function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const buttonConfig: Record<string, { to: string; text: string }> = {
    true: { to: "/profile", text: "Go To Dashboard" },
    false: { to: "/signup", text: "Start Now" },
  };

  const { to, text } = buttonConfig[String(isLoggedIn)];

  return (
    <Page title="WELCOME TO JOURNEY" isNoLogo={true}>
      <div className="main">
        <div className="main__hero">
          <h1 className="main__title title title--xl">
            <span>Welcome To </span>
            <span className="main__logo">
              <Logo/>
            </span>
            <span> -&nbsp;Your Tool to&nbsp;Gamifying Your Life</span>
          </h1>
          <NavLink to={to} className="main__btn btn">
            {text}
          </NavLink>
        </div>
        <div className="container">
        </div>
      </div>
    </Page>
  );
}


export default Main;
