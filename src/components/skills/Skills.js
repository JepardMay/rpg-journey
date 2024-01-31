import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import Page from '../Page';
import Modal from '../modal/Modal';
import PlusIcon from './PlusIcon';
import GoBackIcon from './GoBackIcon';

function Skills({ user, setUser, calculatePercent }) {
  const input = useRef(null);

  const [modalState, setModalState] = useState({
    title: '',
    btnText: '',
    type: 'skill',
    editing: null,
    isOpen: false,
    textInput: '',
  });

  const onEditClick = (skill) => {
    setModalState({
      ...modalState,
      title: 'Edit skill',
      btnText: 'Update',
      editing: skill,
      isOpen: true,
      textInput: skill.name,
    });
    input.current.focus();
  };

  const onAddClick = () => {
    setModalState({
      ...modalState,
      title: 'Add new skill',
      btnText: 'Add',
      isOpen: true,
    });
    input.current.focus();
  };

  const skillsList = user.skills.map((skill, i) => (
    <li className="item" key={`skill-${i}`}>
      <div className="skill">
        <NavLink to='/skill' className="skill__wrapper link" onClick={() => setUser({ ...user, activeTab: `tab-${i + 1}` })}><span className="skill__badge">{skill.level}</span>{skill.name}</NavLink>
        <div className="skill__progress">
          <div className="skill__progressbar" style={{ width: calculatePercent(skill) }}></div>
        </div>
        <button type="type" className="skill__btn" onClick={() => onEditClick(skill)}>⠇</button>
      </div>
    </li>
  ));

  return (
    <Page title='Skills' user={user} setUser={setUser}>
      <div className="container">
        <NavLink to="/" className="link link--go-back">
          <GoBackIcon></GoBackIcon>
        </NavLink>
        <div className="level">
          <p className="level__text">
            Level:&nbsp;
            <span className="level__badge">
              {user.level}
            </span>
          </p>
          <div className="level__progress">
            <div className="level__progressbar" style={{ width: calculatePercent(user) }}></div>
          </div>
        </div>
        <ul className="list">
          {skillsList}
        </ul>
        <button className='btn btn--float btn--icon' type="button" onClick={() => onAddClick()}>
          <PlusIcon></PlusIcon>
        </button>
      </div>
      <Modal user={user} setUser={setUser} modalState={modalState} setModalState={setModalState} input={input} />
    </Page>
  );
}

export default Skills;
