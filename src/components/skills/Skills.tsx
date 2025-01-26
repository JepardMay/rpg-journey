import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import {
  LEVEL_TYPE,
  SkillType,
  ModalType
} from '../../models';
import { calculatePercent } from '../../utils/levels';

import Page from '../common/Page';
import Modal from '../modal/Modal';
import { PlusIcon } from '../icons/PlusIcon';
import { GoBackIcon } from '../icons/GoBackIcon';

function Skills() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  
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

  const skillsList = user.skills.map((skill: SkillType, i: number) => (
    <li className="item" key={skill.name}>
      <div className="skill">
        <NavLink
          to="/skill"
          className="skill__wrapper link"
          onClick={() => dispatch(updateUser({ ...user, activeTab: `tab-${i + 1}` }))}
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
    <Page title="Skills">
      <div className="container">
        <button onClick={ () => navigate(-1) } className="link link--go-back">
          <GoBackIcon></GoBackIcon>
        </button>
        <div className="level">
          <p className="level__text">
            Level:&nbsp; <span className="level__badge">{user.level}</span>
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
        modalState={modalState}
        setModalState={setModalState}
        inputRef={inputRef}
      />
    </Page>
  );
}

export default Skills;
