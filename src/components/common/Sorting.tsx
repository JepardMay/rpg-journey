import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import { SkillType, ActionType } from '../../models';

import '../../assets/styles/components/sorting.css';

function Sorting() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  
  const [listState, setListState] = useState<boolean>(false);

  const open = () => setListState(!listState);

  const onSortingHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const { target } = evt;
    if (target instanceof HTMLElement) {
      if (!target.closest('.sorting__list')) {
        setListState(!listState);
      }
    }
  };

  const escFunction = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setListState(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const sort = (currentSort: string) => {
    if (location.pathname === '/skills') {
      if (currentSort === 'z-a') {
        dispatch(updateUser({
          ...user,
          skills: user.skills.sort((a: SkillType, b: SkillType) => b.name.localeCompare(a.name)),
          skillsSorting: 'Z-A',
        }));
      } else if (currentSort === 'xp-descent') {
        dispatch(updateUser({
          ...user,
          skills: user.skills.sort((a: SkillType, b: SkillType) => a.xp - b.xp),
          skillsSorting: 'XP ↓',
        }));
      } else if (currentSort === 'xp-ascent') {
        dispatch(updateUser({
          ...user,
          skills: user.skills.sort((a: SkillType, b: SkillType) => b.xp - a.xp),
          skillsSorting: 'XP ↑',
        }));
      } else {
        dispatch(updateUser({
          ...user,
          skills: user.skills.sort((a: SkillType, b: SkillType) => a.name.localeCompare(b.name)),
          skillsSorting: 'A-Z',
        }));
      }
    }

    if (location.pathname === '/skill') {
      if (currentSort === 'z-a') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a: ActionType, b: ActionType) => b.text.localeCompare(a.text));
        });

        dispatch(updateUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'Z-A',
        }));
      } else if (currentSort === 'xp-descent') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a: ActionType, b: ActionType) => a.xp - b.xp);
        });

        dispatch(updateUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'XP ↓',
        }));
      } else if (currentSort === 'xp-ascent') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a: ActionType, b: ActionType) => b.xp - a.xp);
        });

        dispatch(updateUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'XP ↑',
        }));
      } else {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a: ActionType, b: ActionType) => a.text.localeCompare(b.text));
        });

        dispatch(updateUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'A-Z',
        }));
      }
    }

    setListState(!listState);
  };

  return (
    <div
      className={`sorting ${listState ? 'sorting--open' : ''}`}
      onClick={onSortingHandler}
    >
      <button className="btn" type="button" onClick={ () => open() }>
        <span>
          {location.pathname === '/skill'
            ? user.actionsSorting
            : user.skillsSorting }
        </span>
      </button>
      <div className="sorting__overlay"></div>
      <ul className="sorting__list">
        <li className="sorting__item">
          <button
            type="button"
            className="sorting__btn"
            onClick={() => sort('a-z')}
          >
            A-Z
          </button>
        </li>
        <li className="sorting__item">
          <button
            type="button"
            className="sorting__btn"
            onClick={() => sort('z-a')}
          >
            Z-A
          </button>
        </li>
        <li className="sorting__item">
          <button
            type="button"
            className="sorting__btn"
            onClick={() => sort('xp-ascent')}
          >
            XP ↑
          </button>
        </li>
        <li className="sorting__item">
          <button
            type="button"
            className="sorting__btn"
            onClick={() => sort('xp-descent')}
          >
            XP ↓
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sorting;
