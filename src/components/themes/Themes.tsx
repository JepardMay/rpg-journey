import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StateType } from '../../model';

import Page from '../Page';
import { GoBackIcon } from '../icons/GoBackIcon';

interface Props {
  user: StateType;
  setUser: (user: StateType) => void;
}

function Themes({ user, setUser }: Props) {
  const navigate = useNavigate();
  
  const themesItems = [];

  const onThemeClick = (num: number) => {
    document.body.className = '';
    document.body.classList.add(`theme-${num}`);
    setUser({
      ...user,
      theme: `theme-${num}`,
    });
  };

  for (let i = 1; i <= 12; i++) {
    themesItems.push(
      <li className="item" key={`theme-${i}`}>
        <button
          className={`theme-btn theme-${i}`}
          type="button"
          onClick={() => onThemeClick(i)}
        ></button>
      </li>,
    );
  }

  return (
    <Page title="Themes">
      <div className="themes">
        <div className="container">
          <button onClick={ () => navigate(-1) } className="link link--go-back">
            <GoBackIcon></GoBackIcon>
          </button>
          <h2 className="title">Themes</h2>
          <ul className="list list--grid">{themesItems}</ul>
        </div>
      </div>
    </Page>
  );
}

export default Themes;
