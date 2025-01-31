import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { useMenuToggle } from '../../hooks/useMenuToggle';

import Sorting from './Sorting';
import Menu from './Menu';

import {
  LogoImg,
  Burger,
  Logo
} from '../icons';

import '../../assets/styles/components/header.css';
import '../../assets/styles/components/menu.css';

interface Props {
  isNoLogo?: boolean;
}

function Header({ isNoLogo }: Readonly<Props>) {
  const user = useSelector((state: RootState) => state.user);

  const { menuState, toggleMenu, closeMenu, menuRef, toggleRef } = useMenuToggle();

  return (
    <header className={ `header ${menuState ? 'header--open' : ''}` }>
      <div className="container">
        <div className="header__wrapper">
          <NavLink to="/" className="header__link">
            <LogoImg></LogoImg>
          </NavLink>
          <button
            className="header__burger"
            type="button"
            onClick={ toggleMenu }
            ref={ toggleRef }
          >
            <Burger></Burger>
          </button>
          {!isNoLogo && <div className="header__logo">
            <Logo></Logo>
          </div>}
          {user && <Sorting/>}
        </div>
      </div>
      <Menu closeMenu={ closeMenu } menuRef={ menuRef } />
    </header>
  );
}

export default Header;
