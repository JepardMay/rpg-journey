import React, { useState, useEffect, useCallback } from 'react';

import './sorting.css';

function Sorting({ user, setUser }) {
  const [listState, setListState] = useState(false);

  const open = () => setListState(!listState);

  const onSortingHandler = (evt) => {
    if (!evt.target.closest('.sorting__list')) {
      setListState(!listState);
    }
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setListState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const sort = (currentSort) => {
    if (window.location.pathname === '/skills') {
      if (currentSort === 'z-a') {
        setUser({
          ...user,
          skills: user.skills.sort((a, b) => b.name.localeCompare(a.name)),
          skillsSorting: 'Z-A',
        });
      } else if (currentSort === 'xp-descent') {
        setUser({
          ...user,
          skills: user.skills.sort((a, b) => a.xp - b.xp),
          skillsSorting: 'XP ↓',
        });
      } else if (currentSort === 'xp-ascent') {
        setUser({
          ...user,
          skills: user.skills.sort((a, b) => b.xp - a.xp),
          skillsSorting: 'XP ↑',
        });
      } else {
        setUser({
          ...user,
          skills: user.skills.sort((a, b) => a.name.localeCompare(b.name)),
          skillsSorting: 'A-Z',
        });
      }
    }

    if (window.location.pathname === '/skill') {
      if (currentSort === 'z-a') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a, b) => b.text.localeCompare(a.text));
        });

        setUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'Z-A',
        });
      } else if (currentSort === 'xp-descent') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a, b) => a.xp - b.xp);
        });

        setUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'XP ↓',
        });
      } else if (currentSort === 'xp-ascent') {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a, b) => b.xp - a.xp);
        });

        setUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'XP ↑',
        });
      } else {
        const newSkills = [...user.skills];
        newSkills.forEach((skill) => {
          skill.actions.sort((a, b) => a.text.localeCompare(b.text));
        });

        setUser({
          ...user,
          skills: newSkills,
          actionsSorting: 'A-Z',
        });
      }
    }

    setListState(!listState);
  }
  
  return (
    <div className={`sorting ${listState ? 'sorting--open' : ''}`} onClick={onSortingHandler}>
      <button className="btn" type="button" onClick={() => open()}>{window.location.pathname === '/skill' ? user.actionsSorting : user.skillsSorting}</button>
      <div className="sorting__overlay"></div>
      <ul className="sorting__list">
        <li className="sorting__item">
          <button type="button" className="sorting__btn" onClick={() => sort('a-z')}>A-Z</button>
        </li>
        <li className="sorting__item">
          <button type="button" className="sorting__btn" onClick={() => sort('z-a')}>Z-A</button>
        </li>
        <li className="sorting__item">
          <button type="button" className="sorting__btn" onClick={() => sort('xp-ascent')}>XP ↑</button>
        </li>
        <li className="sorting__item">
          <button type="button" className="sorting__btn" onClick={() => sort('xp-descent')}>XP ↓</button>
        </li>
      </ul>
    </div>
  );
}

export default Sorting;
