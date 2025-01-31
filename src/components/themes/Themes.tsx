import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import Page from '../common/Page';
import ThemeButton from './ThemeButton';
import { GoBackIcon } from '../icons';

function Themes() {
  const { theme } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const onThemeClick = useCallback((num: number) => {
    const newTheme = `theme-${num}`;
    document.body.className = newTheme;
    dispatch(updateUser({ theme: newTheme }));
  }, [dispatch]);

  return (
    <Page title="Themes">
      <div className="themes">
        <div className="container">
          <button onClick={ () => navigate(-1) } className="link link--go-back">
            <GoBackIcon></GoBackIcon>
          </button>
          <h2 className="title">Themes</h2>
          <ul className="list list--grid">
            { Array.from({ length: 12 }, (_, index) => (
              <ThemeButton
                key={`theme-${index + 1}`}
                number={index + 1}
                isActive={theme === `theme-${index + 1}`}
                onClick={() => onThemeClick(index + 1)}
              />
            ))
            }
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default Themes;
