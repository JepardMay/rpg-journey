import React, { useState, useEffect, useCallback, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import { StateType } from '../../model';

import Sorting from '../sorting/Sorting';

import { LogoImg } from '../icons/LogoImg';
import { Burger } from '../icons/Burger';
import { Logo } from '../icons/Logo';
import { ProfileIcon } from '../icons/ProfileIcon';
import { SkillIcon } from '../icons/SkillsIcon';
import { HistoryIcon } from '../icons/HistoryIcon';
import { FaqIcon } from '../icons/FaqIcon';
import { SettingsIcon } from '../icons/SettingsIcon';

import './header.css';
import './menu.css';

interface Props {
  user?: StateType;
  setUser?: (user: StateType) => void;
  isNoLogo?: boolean;
}

function Header({ user, setUser, isNoLogo }: Props) {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Sign component must be used within an AuthProvider');
  }

  const { isLoggedIn, logout } = authContext;

  const [menuState, setMenuState] = useState<boolean>(false);

  const onBurgerClick = () => setMenuState(!menuState);

  const onMenuHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const { target } = evt;
    if (target instanceof HTMLElement) {
      if (!target.closest('.menu__wrapper')) {
        setMenuState(false);
      }
    }
  };

  const escFunction = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setMenuState(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <header className={`header ${menuState ? 'header--open' : ''}`}>
      <div className="container">
        <div className="header__wrapper">
          <NavLink to="/" className="header__link">
            <LogoImg></LogoImg>
          </NavLink>
          <button
            className="header__burger"
            type="button"
            onClick={() => onBurgerClick()}
          >
            <Burger></Burger>
          </button>
          {!isNoLogo && <div className="header__logo">
            <Logo></Logo>
          </div>}
          {user && setUser && <Sorting user={user} setUser={setUser}></Sorting>}
        </div>
      </div>
      <div className="menu" onClick={onMenuHandler}>
        <nav className="menu__wrapper">
          <div className="menu__section">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink className="menu__link link" to="/profile">
                  <span className="menu__icon">
                    <ProfileIcon></ProfileIcon>
                  </span>
                  Profile
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link link" to="/skills">
                  <span className="menu__icon">
                    <SkillIcon></SkillIcon>
                  </span>
                  Skills
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link link" to="/history">
                  <span className="menu__icon">
                    <HistoryIcon></HistoryIcon>
                  </span>
                  History
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="menu__section">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink className="menu__link link" to="/">
                  <span className="menu__icon">
                    <FaqIcon></FaqIcon>
                  </span>
                  FAQ
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link link" to="/themes">
                  <span className="menu__icon">
                    <SettingsIcon></SettingsIcon>
                  </span>
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          { isLoggedIn &&
            <div className="menu__section">
              <button className="btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
