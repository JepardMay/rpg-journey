import React, { useState, useEffect, useCallback } from 'react';

import CloseIcon from './CloseIcon';
import DeleteIcon from './DeleteIcon';

import './modal.css';

function Modal({ user, setUser, modalState, setModalState, input }) {
  const [error, setError] = useState({
    text: null,
    xp: null,
  });

  function Skill(name) {
    this.name = name;
    this.level = 1;
    this.xp = 0;
    this.actions = [];
  }

  function Action(text, num) {
    this.text = text;
    this.xp = num;
  }

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
    setTimeout(() => {
      setModalState({
        ...modalState,
        isOpen: false,
        editing: null,
        textInput: '',
        xpInput: '',
      });
      setError({
        text: null,
        xp: null,
      });
    }, 400);
  }

  const onModalHandler = (evt) => {
    if (!evt.target.closest('.modal__wrapper') || evt.target.closest('.modal__close')) {
      closeModal();
    }
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const edit = () => {
    if (modalState.type === 'skill') {
      if (modalState.textInput !== '') {
        const isDuplicate = user.skills.some((item, index) => modalState.textInput.toLowerCase() === item.name.toLowerCase() && user.skills.indexOf(modalState.editing) !== index);
        
        if (!isDuplicate) {
          setError({
            text: null,
          });
          const newSkills = [...user.skills];
          newSkills[user.skills.indexOf(modalState.editing)] = {
            ...newSkills[user.skills.indexOf(modalState.editing)],
            name: modalState.textInput,
          };
          setUser({
            ...user,
            skills: newSkills,
          });

          closeModal();
        } else {
          setError({
            ...error,
            text: 'A skill with this name already exists',
          });
        }
      } else {
        setError({
          ...error,
          text: 'The name cannot be empty',
        });
      }
    }

    if (modalState.type === 'action') {
      const skillIndex = Array.from(document.querySelectorAll('.tabs__item')).indexOf(document.querySelector('.tabs__item.is-active'));
      
      if (modalState.textInput !== '' && modalState.xpInput !== '') {
        const isDuplicate = user.skills[skillIndex].actions.some((item, index) => modalState.textInput.toLowerCase() === item.text.toLowerCase() && user.skills[skillIndex].actions.indexOf(modalState.editing) !== index);

        if (!isDuplicate) {
          setError({
            text: null,
            xp: null,
          });
          const actionIndex = user.skills[skillIndex].actions.indexOf(modalState.editing);
          const newSkills = [...user.skills];
          newSkills[skillIndex].actions[actionIndex] = {
            ...newSkills[skillIndex].actions[actionIndex],
            text: modalState.textInput,
            xp: Number(modalState.xpInput),
          };
          setUser({
            ...user,
            skills: newSkills,
          });

          closeModal();
        } else {
          setError({
            ...error,
            text: 'A action with this name already exists',
          });
        }
      } else {
        if (modalState.textInput === '' && modalState.xpInput === '') {
          setError({
            text: 'The name cannot be empty',
            xp: 'The xp cannot be empty',
          });
        } else if (modalState.textInput === '' && modalState.xpInput !== '') {
          setError({
            text: 'The name cannot be empty',
            xp: null,
          });
        } else if (modalState.textInput !== '' && modalState.xpInput === '') {
          setError({
            text: null,
            xp: 'The xp cannot be empty',
          });
        }
      }
    }
  }

  const add = () => {

    if (modalState.type === 'skill') {
      if (modalState.textInput !== '') {
        const isDuplicate = user.skills.some(item => modalState.textInput.toLowerCase() === item.name.toLowerCase());

        if (!isDuplicate) {
          setError({
            text: null,
          });
          const newSkill = new Skill(modalState.textInput);
          setUser({
            ...user,
            skills: [...user.skills.concat(newSkill)],
          });

          closeModal();
        } else {
          setError({
            ...error,
            text: 'A skill with this name already exists',
          });
        }
      } else {
        setError({
          ...error,
          text: 'The name cannot be empty',
        });
      }
    }

    if (modalState.type === 'action') {
      const skillIndex = Array.from(document.querySelectorAll('.tabs__item')).indexOf(document.querySelector('.tabs__item.is-active'));

      if (modalState.textInput !== '' && modalState.xpInput !== '') {
        const isDuplicate = user.skills[skillIndex].actions.some(item => modalState.textInput.toLowerCase() === item.text.toLowerCase());

        if (!isDuplicate) {
          setError({
            text: null,
            xp: null,
          });
          const newAction = new Action(modalState.textInput, Number(modalState.xpInput));
          const newSkills = [...user.skills];
          newSkills[skillIndex] = {
            ...newSkills[skillIndex],
            actions: [...newSkills[skillIndex].actions.concat(newAction)],
          };
          setUser({
            ...user,
            skills: newSkills
          });

          closeModal();
        } else {
          setError({
            ...error,
            text: 'A action with this name already exists',
          });
        }
      } else {
        if (modalState.textInput === '' && modalState.xpInput === '') {
          setError({
            text: 'The name cannot be empty',
            xp: 'The xp cannot be empty',
          });
        } else if (modalState.textInput === '' && modalState.xpInput !== '') {
          setError({
            text: 'The name cannot be empty',
            xp: null,
          });
        } else if (modalState.textInput !== '' && modalState.xpInput === '') {
          setError({
            text: null,
            xp: 'The xp cannot be empty',
          });
        }
      }
    }
  }

  const deleteItem = () => {
    if (modalState.type === 'skill') {
      const deletedSkillIndex = user.skills.indexOf(modalState.editing);
      setUser({
        ...user,
        skills: user.skills.filter((skill, i) => i !== deletedSkillIndex && skill),
      });

      closeModal();
    }

    if (modalState.type === 'action') {
      const skillIndex = Array.from(document.querySelectorAll('.tabs__item')).indexOf(document.querySelector('.tabs__item.is-active'));
      const deletedActionIndex = user.skills[skillIndex].actions.indexOf(modalState.editing);
      const newSkills = [...user.skills];
      newSkills[skillIndex] = {
        ...newSkills[skillIndex],
        actions: newSkills[skillIndex].actions.filter((action, i) => i !== deletedActionIndex && action),
      };
      setUser({
        ...user,
        skills: newSkills,
      });

      closeModal();
    }
  }
  
  return (
    <div className={`modal ${modalState.isOpen ? 'modal--open' : ''}`} onClick={onModalHandler}>
      <div className="modal__wrapper">
        <button type="button" className='modal__close'>
          <CloseIcon></CloseIcon>
        </button>
        <h3 className="modal__title title">{modalState.title}</h3>
        <div className="modal__input">
          <input ref={input} className={error.text ? 'is-invalid' : ''} type="text" required min="3" max="100" placeholder="Enter name" value={modalState.textInput} onChange={e => {
            setModalState({
              ...modalState,
              textInput: e.target.value.trim(),
            });
            setError({
              ...error,
              text: null,
            });
          }} />
          {error.text && <span className="modal__error">{error.text}</span>}
        </div>
        {modalState.type === 'action' ?
          <div className="modal__input">
            <input className={error.xp ? 'is-invalid' : ''} type="number" required min="1" max="100" placeholder="Enter xp" value=  {modalState.xpInput} onChange={e => {
              setModalState({
                ...modalState,
                xpInput: e.target.value.trim(),
              });
              setError({
                ...error,
                xp: null,
              });
            }} />
            {error.xp && <span className="modal__error">{error.xp}</span>}
          </div> : null}
        <div className="modal__footer">
          <button className="modal__btn btn" type="button" onClick={modalState.editing ? edit : add}>{modalState.btnText}</button>
          {modalState.editing && <button className="modal__btn btn btn--icon" type="button" onClick={deleteItem}>
            <DeleteIcon></DeleteIcon>
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
