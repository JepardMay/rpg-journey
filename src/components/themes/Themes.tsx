import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import Page from '../common/Page';
import { GoBackIcon } from '../icons/GoBackIcon';

function Themes() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  
  const themesItems = [];

  const onThemeClick = (num: number) => {
    document.body.className = '';
    document.body.classList.add(`theme-${num}`);
    dispatch(updateUser({
      ...user,
      theme: `theme-${num}`,
    }));
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
