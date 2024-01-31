import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import Sorting from '../sorting/Sorting';
import Burger from './Burger';
import Logo from './Logo';
import LogoImg from '../loading/LogoImg';
import ProfileIcon from './ProfileIcon';
import SkillIcon from './SkillsIcon';
import HistoryIcon from './HistoryIcon';
import FaqIcon from './FaqIcon';
import SettingsIcon from './SettingsIcon';

import './header.css';
import './menu.css';

function Header({user, setUser}) {
  const [menuState, setMenuState] = useState(false);
  const onBurgerClick = () => setMenuState(!menuState);

  const onMenuHandler = (evt) => {
    if (!evt.target.closest('.menu__wrapper')) {
      setMenuState(false);
    }
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <header className={`header ${menuState ? 'header--open' : ''}`}>
      <div className="container">
        <div className="header__wrapper">
          <NavLink to="/" className="header__link">
            <LogoImg></LogoImg>
          </NavLink>
          <button className="header__burger" type="button" onClick={() => onBurgerClick()}>
            <Burger></Burger>
          </button>
          <div className="header__logo">
            <Logo></Logo>
          </div>
          {(window.location.pathname === '/skill' || window.location.pathname === '/skills') && <Sorting user={user} setUser={setUser}></Sorting>}
        </div>
      </div>
      <div className="menu" onClick={onMenuHandler}>
        <nav className="menu__wrapper">
         <div className="menu__section">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink className='menu__link link' to="/">
                  <span className="menu__icon"><ProfileIcon></ProfileIcon></span>
                  Profile
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className='menu__link link' to="/skills">
                  <span className="menu__icon"><SkillIcon></SkillIcon></span>
                  Skills
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className='menu__link link' to="/history">
                  <span className="menu__icon"><HistoryIcon></HistoryIcon></span>
                  History
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="menu__section">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink className='menu__link link' to="/">
                  <span className="menu__icon"><FaqIcon></FaqIcon></span>
                  FAQ
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className='menu__link link' to="/themes">
                  <span className="menu__icon"><SettingsIcon></SettingsIcon></span>
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
