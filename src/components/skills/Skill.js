import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Page from '../Page';
import Modal from '../modal/Modal';
import PlusIcon from './PlusIcon';
import GoBackIcon from './GoBackIcon';
import CloseIcon from '../modal/CloseIcon';

function Skill({ user, setUser, calculateLevel, calculatePercent }) {
  let timer;
  const input = useRef(null);
  const [lastAdded, setLastAdded] = useState(null);

  const [modalState, setModalState] = useState({
    title: '',
    type: 'action',
    editing: null,
    isOpen: false,
    textInput: '',
    xpInput: '',
  });

  function HistoryItem(action) {
    this.text = action.text;
    this.xp = action.xp;
    this.date = new Date();
  }

  const onNavBtnClick = (evt, i) => {
    setUser({ ...user, activeTab: `tab-${i + 1}` });
    evt.target.scrollIntoView({ behavior: "smooth", inline: 'center'});
  }

  const onActionClick = (skill, action) => {
    clearTimeout(timer);

    const newSkills = [...user.skills];
    const newXP = (newSkills[newSkills.indexOf(skill)].xp + action.xp) >= 0 ? (newSkills[newSkills.indexOf(skill)].xp + action.xp) : 0;

    newSkills[newSkills.indexOf(skill)] = {
      ...newSkills[newSkills.indexOf(skill)],
      xp: newXP,
      level: calculateLevel(newXP),
    };

    const newItemText = new HistoryItem(action);

    setUser({
      ...user,
      xp: (user.xp + action.xp) >= 0 ? (user.xp + action.xp) : 0,
      level: calculateLevel(user.xp),
      skills: newSkills,
      history: [...user.history.concat(newItemText)],
    });

    setLastAdded(newItemText);

    timer = setTimeout(() => {
      setLastAdded(null);
      clearTimeout(timer);
    }, 3000);
  };

  const onEditClick = (action) => {
    setModalState({
      ...modalState,
      title: 'Edit action',
      btnText: 'Update',
      editing: action,
      isOpen: true,
      textInput: action.text,
      xpInput: action.xp,
    });
    input.current.focus();
  };

  const onAddClick = () => {
    setModalState({
      ...modalState,
      title: 'Add new action',
      btnText: 'Add',
      isOpen: true,
    });
    input.current.focus();
  };

  const onUndoClick = () => {
    setLastAdded(null);
    setUser({
      ...user,
      history: user.history.slice(0, -1),
    });
    clearTimeout(timer);
  };

  const skillsList = user.skills.map((skill, i) => (
    <li className={'horizontal-nav__item' + (`tab-${i + 1}` === user.activeTab ? ' is-active' : '')} key={`skill-tab-${i}`}>
      <button className='link' data-tab={i + 1} type='button' onClick={(evt) => onNavBtnClick(evt, i)}>{skill.name}<span className='horizontal-nav__badge'>{skill.actions.length}</span> </button>
    </li>
  ));

  const tabsList = user.skills.map((skill, i) => (
    <li className={'tabs__item' + (`tab-${i + 1}` === user.activeTab ? ' is-active' : '')} key={`tab-${i}`}>
      <div className="skill">
        <div className="skill__wrapper"><span className="skill__badge">{skill.level}</span>{skill.name}</div>
        <div className="skill__progress">
          <div className="skill__progressbar" style={{ width: calculatePercent(skill) }}></div>
        </div>
      </div>
      <ul className='list'>
        {skill.actions.map((action, i) => (
          <li className='item' key={`action-${i}`}>
            <div className="action">
              <button className='action__wrapper' type='button' onClick={() => onActionClick(skill, action)}>
                <span className='action__text'>{action.text}</span>
                <span className={'action__xp' + (action.xp < 0 ? ' action__xp--neg' : '')}>{action.xp}&nbsp;xp</span>
              </button>
              <button type="type" className="action__btn" onClick={() => onEditClick(action)}>⠇</button>
            </div>
          </li>
        ))}
      </ul>
    </li>
  ));
  return (
    <Page title='Skill' user={user} setUser={setUser}>
      <div className='container'>
        <NavLink to="/skills" className="link link--go-back">
          <GoBackIcon></GoBackIcon>
        </NavLink>
        <nav className='horizontal-nav'>
          <ul className='horizontal-nav__list'>
            {skillsList}
          </ul>
        </nav>
        <ul className='tabs'>
          {tabsList}
        </ul>
        <button className='btn btn--float btn--icon' type="button" onClick={() => onAddClick()}>
          <PlusIcon></PlusIcon>
        </button>
        {lastAdded &&
          <div className="notification">
            <button type="button" className='notification__close'>
              <CloseIcon></CloseIcon>
            </button>
            <span className="notification__text">{lastAdded.xp}xp</span>
            <button type="button" className="btn" onClick={() => onUndoClick()}>Undo</button>
            <div className={`notification__progress ${lastAdded ? ' active' : ''}`}></div>
          </div>
        }
      </div>
      <Modal user={user} setUser={setUser} modalState={modalState} setModalState={setModalState} input={input} />
    </Page>
  );
}

export default Skill;
