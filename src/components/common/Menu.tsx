import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logout } from '../../reducers/authSlice';

import {
  ProfileIcon,
  SkillIcon,
  HistoryIcon,
  FaqIcon,
  SettingsIcon
} from '../icons';

import '../../assets/styles/components/header.css';
import '../../assets/styles/components/menu.css';

const menuItems = [
  [
    { path: '/profile', icon: <ProfileIcon />, label: 'Profile' },
    { path: '/skills', icon: <SkillIcon />, label: 'Skills' },
    { path: '/history', icon: <HistoryIcon />, label: 'History' },
  ],
  [
    { path: '/', icon: <FaqIcon />, label: 'FAQ' },
    { path: '/themes', icon: <SettingsIcon />, label: 'Settings' },
  ]
];

interface Props {
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

function Menu({ closeMenu, menuRef }: Readonly<Props>) {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
    closeMenu();
  };

  return (
    <div className="menu">
      <nav className="menu__wrapper" ref={menuRef}>
        { menuItems.map((section, i) => (
          <div className="menu__section" key={`section-${i+1}`}>
            <ul className="menu__list">
              { section.map((item) => (
                <li className="menu__item" key={item.label}>
                  <NavLink className="menu__link link" to={ item.path }>
                    <span className="menu__icon">{ item.icon }</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )) }
        { isLoggedIn &&
          <div className="menu__section">
            <button className="btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        }
      </nav>
    </div>
  );
}

export default Menu;
