import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import {
  LEVEL_TYPE,
  StateType,
  SkillType,
  ModalType
} from '../../model';

import Page from '../Page';
import Modal from '../modal/Modal';
import { PlusIcon } from '../icons/PlusIcon';
import { GoBackIcon } from '../icons/GoBackIcon';

interface Props {
  user: StateType;
  setUser: (user: StateType) => void;
  calculatePercent: (xp: number, level: number, type: string) => string;
}

function Skills({ user, setUser, calculatePercent }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [modalState, setModalState] = useState<ModalType>({
    title: '',
    btnText: '',
    type: 'skill',
    editing: null,
    isOpen: false,
    textInput: '',
  });

  const onEditClick = (skill: SkillType) => {
    setModalState({
      ...modalState,
      title: 'Edit skill',
      btnText: 'Update',
      editing: skill,
      isOpen: true,
      textInput: skill.name,
    });

    inputRef.current?.focus();
  };

  const onAddClick = () => {
    setModalState({
      ...modalState,
      title: 'Add new skill',
      btnText: 'Add',
      isOpen: true,
    });

    inputRef.current?.focus();
  };

  const skillsList = user.skills.map((skill, i) => (
    <li className="item" key={`skill-${i}`}>
      <div className="skill">
        <NavLink
          to="/skill"
          className="skill__wrapper link"
          onClick={() => setUser({ ...user, activeTab: `tab-${i + 1}` })}
        >
          <span className="skill__badge">{skill.level}</span>
          {skill.name}
        </NavLink>
        <div className="skill__progress">
          <div
            className="skill__progressbar"
            style={{ width: calculatePercent(skill.xp, skill.level, LEVEL_TYPE.SKILL) }}
          ></div>
        </div>
        <button
          type="button"
          className="skill__btn"
          onClick={() => onEditClick(skill)}
        >
          ⠇
        </button>
      </div>
    </li>
  ));

  return (
    <Page title="Skills" user={user} setUser={setUser}>
      <div className="container">
        <NavLink to="/profile" className="link link--go-back">
          <GoBackIcon></GoBackIcon>
        </NavLink>
        <div className="level">
          <p className="level__text">
            Level:&nbsp;
            <span className="level__badge">{user.level}</span>
          </p>
          <div className="level__progress">
            <div
              className="level__progressbar"
              style={{ width: calculatePercent(user.xp, user.level, LEVEL_TYPE.SKILL) }}
            ></div>
          </div>
        </div>
        <ul className="list">{skillsList}</ul>
        <button
          className="btn btn--float btn--icon"
          type="button"
          onClick={() => onAddClick()}
        >
          <PlusIcon></PlusIcon>
        </button>
      </div>
      <Modal
        user={user}
        setUser={setUser}
        modalState={modalState}
        setModalState={setModalState}
        inputRef={inputRef}
      />
    </Page>
  );
}

export default Skills;
