import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LEVEL_TYPE,
  StateType,
  SkillType,
  ActionType,
  HistoryType,
  ModalType,
} from '../../model';

import Page from '../Page';
import Modal from '../modal/Modal';
import { PlusIcon } from '../icons/PlusIcon';
import { GoBackIcon } from '../icons/GoBackIcon';
import { CloseIcon } from '../icons/CloseIcon';

interface Props {
  user: StateType;
  setUser: (user: StateType) => void;
  calculatePercent: (xp: number, level: number, type: string) => string;
  calculateLevel: (xp: number, type: string) => number;
}

function Skill({ user, setUser, calculateLevel, calculatePercent }: Props) {
  const navigate = useNavigate();
  
  let timer: ReturnType<typeof setTimeout>;
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastAdded, setLastAdded] = useState<HistoryType | null>(null);

  const [modalState, setModalState] = useState<ModalType>({
    title: '',
    type: 'action',
    editing: null,
    isOpen: false,
    textInput: '',
    xpInput: '',
  });

  useEffect(() => {
    const notificationProgress = document.querySelector(
      '.notification__progress',
    );
    if (notificationProgress && lastAdded) {
      notificationProgress.classList.remove('active');
      setTimeout(() => {
        notificationProgress.classList.add('active');
      }, 10);
    }

    timer = setTimeout(() => {
      setLastAdded(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [lastAdded]);

  class HistoryItem implements HistoryType {
    skill: string;
    text: string;
    xp: number;
    date: Date;
    checked: boolean;

    constructor(action: ActionType, skillName: string) {
      this.skill = skillName;
      this.text = action.text;
      this.xp = action.xp;
      this.date = new Date();
      this.checked = false;
    }
  }

  const onNavBtnClick = (evt: React.MouseEvent<HTMLElement>, i: number) => {
    setUser({ ...user, activeTab: `tab-${i + 1}` });

    const { target } = evt;
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const onActionClick = (skill: SkillType, action: ActionType) => {
    const newSkills = [...user.skills];
    let newSkill = newSkills[newSkills.indexOf(skill)];
    const newXP = newSkill.xp + action.xp >= 0 ? newSkill.xp + action.xp : 0;

    newSkill = {
      ...newSkill,
      xp: newXP,
      level: calculateLevel(newXP, LEVEL_TYPE.SKILL),
    };
    newSkills[newSkills.indexOf(skill)] = newSkill;

    const newItemText = new HistoryItem(action, skill.name);

    setUser({
      ...user,
      xp: user.xp + action.xp >= 0 ? user.xp + action.xp : 0,
      level: calculateLevel(user.xp, LEVEL_TYPE.USER),
      skills: newSkills,
      history: [...user.history.concat(newItemText)],
    });

    setLastAdded(newItemText);
  };

  const onEditClick = (action: ActionType) => {
    setModalState({
      ...modalState,
      title: 'Edit action',
      btnText: 'Update',
      editing: action,
      isOpen: true,
      textInput: action.text,
      xpInput: action.xp.toString(),
    });

    inputRef.current?.focus();
  };

  const onAddClick = () => {
    setModalState({
      ...modalState,
      title: 'Add new action',
      btnText: 'Add',
      isOpen: true,
    });

    inputRef.current?.focus();
  };

  const onUndoClick = () => {
    setLastAdded(null);
    setUser({
      ...user,
      history: user.history.slice(0, -1),
    });
  };

  const skillsList = user.skills.map((skill, i) => (
    <li
      className={
        'horizontal-nav__item' +
        (`tab-${i + 1}` === user.activeTab ? ' is-active' : '')
      }
      key={`skill-tab-${i}`}
    >
      <button
        className="link"
        data-tab={i + 1}
        type="button"
        onClick={(evt) => onNavBtnClick(evt, i)}
      >
        {skill.name}
        <span className="horizontal-nav__badge">
          {skill.actions.length}
        </span>{' '}
      </button>
    </li>
  ));

  const tabsList = user.skills.map((skill, i) => (
    <li
      className={
        'tabs__item' + (`tab-${i + 1}` === user.activeTab ? ' is-active' : '')
      }
      key={`tab-${i}`}
    >
      <div className="skill">
        <div className="skill__wrapper">
          <span className="skill__badge">{skill.level}</span>
          {skill.name}
        </div>
        <div className="skill__progress">
          <div
            className="skill__progressbar"
            style={{ width: calculatePercent(skill.xp, skill.level, LEVEL_TYPE.SKILL) }}
          ></div>
        </div>
      </div>
      <ul className="list">
        {skill.actions.map((action, i) => (
          <li className="item" key={`action-${i}`}>
            <div className="action">
              <button
                className="action__wrapper"
                type="button"
                onClick={() => onActionClick(skill, action)}
              >
                <span className="action__text">{action.text}</span>
                <span
                  className={
                    'action__xp' + (action.xp < 0 ? ' action__xp--neg' : '')
                  }
                >
                  {action.xp}&nbsp;xp
                </span>
              </button>
              <button
                type="button"
                className="action__btn"
                onClick={() => onEditClick(action)}
              >
                ⠇
              </button>
            </div>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <Page title="Skill" user={user} setUser={setUser}>
      <div className="container">
        <button onClick={ () => navigate(-1) } className="link link--go-back">
          <GoBackIcon></GoBackIcon>
        </button>
        <nav className="horizontal-nav">
          <ul className="horizontal-nav__list">{skillsList}</ul>
        </nav>
        <ul className="tabs">{tabsList}</ul>
        <button
          className="btn btn--float btn--icon"
          type="button"
          onClick={() => onAddClick()}
        >
          <PlusIcon></PlusIcon>
        </button>
        {lastAdded && (
          <div className="notification">
            <button
              type="button"
              className="notification__close"
              onClick={() => setLastAdded(null)}
            >
              <CloseIcon></CloseIcon>
            </button>
            <span className="notification__text">{lastAdded.xp}xp</span>
            <button type="button" className="btn" onClick={() => onUndoClick()}>
              <span>Undo</span>
            </button>
            <div className="notification__progress"></div>
          </div>
        )}
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

export default Skill;
