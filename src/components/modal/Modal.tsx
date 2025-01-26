import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import {
  EDIT_TYPE,
  SkillType,
  ActionType,
  ErrorType,
  ModalType,
} from '../../models';

import { CloseIcon } from '../icons/CloseIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

import '../../assets/styles/components/modal.css';

interface Props {
  modalState: ModalType;
  setModalState: (modalState: ModalType) => void;
  inputRef: React.Ref<HTMLInputElement>;
}

function Modal({ modalState, setModalState, inputRef }: Readonly<Props>) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState<ErrorType>({
    text: null,
    xp: null,
  });

  class Skill implements SkillType {
    name: string;
    level: number;
    xp: number;
    actions: [];

    constructor(name: string) {
      this.name = name;
      this.level = 1;
      this.xp = 0;
      this.actions = [];
    }
  }

  class Action implements ActionType {
    text: string;
    xp: number;

    constructor(text: string, num: number) {
      this.text = text;
      this.xp = num;
    }
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
  };

  const onModalHandler = (evt: React.MouseEvent<HTMLElement>) => {
    const { target } = evt;
    if (target instanceof HTMLElement) {
      if (
        !target.closest('.modal__wrapper') ||
        target.closest('.modal__close')
      ) {
        closeModal();
      }
    }
  };

  const escFunction = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const edit = () => {
    switch (modalState.type) {
      case EDIT_TYPE.SKILL: {
        if (modalState.textInput !== '') {
          const isDuplicate =
            user.skills.length > 0
              ? user.skills.some(
                  (item: SkillType, index: number) =>
                    modalState.textInput.toLowerCase() ===
                      item?.name.toLowerCase() &&
                    user.skills.indexOf(modalState.editing as SkillType) !==
                      index,
                )
              : false;

          if (!isDuplicate) {
            setError({
              text: null,
            });
            const newSkills = [...user.skills];
            newSkills[user.skills.indexOf(modalState.editing as SkillType)] = {
              ...newSkills[
                user.skills.indexOf(modalState.editing as SkillType)
              ],
              name: modalState.textInput,
            };
            dispatch(updateUser({
              ...user,
              skills: newSkills,
            }));

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
        break;
      }
      case EDIT_TYPE.ACTION: {
        if (modalState.textInput !== '' && modalState.xpInput !== '') {
          const activeTab = document.querySelector('.tabs__item.is-active');
          const skillIndex = activeTab
            ? Array.from(document.querySelectorAll('.tabs__item')).indexOf(
                activeTab,
              )
            : 0;

          const isDuplicate = user.skills[skillIndex].actions.some(
            (item: ActionType, index: number) =>
              modalState.textInput.toLowerCase() === item.text.toLowerCase() &&
              user.skills[skillIndex].actions.indexOf(
                modalState.editing as ActionType,
              ) !== index,
          );

          if (!isDuplicate) {
            setError({
              text: null,
              xp: null,
            });
            const actionIndex = user.skills[skillIndex].actions.indexOf(
              modalState.editing as ActionType,
            );
            const newSkills = [...user.skills];
            newSkills[skillIndex].actions[actionIndex] = {
              ...newSkills[skillIndex].actions[actionIndex],
              text: modalState.textInput,
              xp: Number(modalState.xpInput),
            };
            dispatch(updateUser({
              ...user,
              skills: newSkills,
            }));

            closeModal();
          } else {
            setError({
              ...error,
              text: 'An action with this name already exists',
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
        break;
      }
      default:
        break;
    }
  };

  const add = () => {
    switch (modalState.type) {
      case EDIT_TYPE.SKILL: {
        if (modalState.textInput !== '') {
          const isDuplicate = user.skills.some(
            (item: SkillType) =>
              modalState.textInput.toLowerCase() === item.name.toLowerCase(),
          );

          if (!isDuplicate) {
            setError({
              text: null,
            });
            const newSkill = new Skill(modalState.textInput);
            dispatch(updateUser({
              ...user,
              skills: [...user.skills.concat(newSkill)],
            }));

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
        break;
      }
      case EDIT_TYPE.ACTION: {
        if (modalState.textInput !== '' && modalState.xpInput !== '') {
          const activeTab = document.querySelector('.tabs__item.is-active');
          const skillIndex = activeTab
            ? Array.from(document.querySelectorAll('.tabs__item')).indexOf(
                activeTab,
              )
            : 0;

          const isDuplicate = user.skills[skillIndex].actions.some(
            (item: ActionType) =>
              modalState.textInput.toLowerCase() === item.text.toLowerCase(),
          );

          if (!isDuplicate) {
            setError({
              text: null,
              xp: null,
            });
            const newAction = new Action(
              modalState.textInput,
              Number(modalState.xpInput),
            );
            const newSkills = [...user.skills];
            newSkills[skillIndex] = {
              ...newSkills[skillIndex],
              actions: [...newSkills[skillIndex].actions.concat(newAction)],
            };
            dispatch(updateUser({
              ...user,
              skills: newSkills,
            }));

            closeModal();
          } else {
            setError({
              ...error,
              text: 'An action with this name already exists',
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
        break;
      }
      default:
        break;
    }
  };

  const deleteItem = () => {
    switch (modalState.type) {
      case EDIT_TYPE.SKILL: {
        const deletedSkillIndex = user.skills.indexOf(
          modalState.editing as SkillType,
        );
        dispatch(updateUser({
          ...user,
          skills: user.skills.filter(
            (skill: SkillType, i: number) => i !== deletedSkillIndex && skill,
          ),
        }));

        closeModal();
        break;
      }
      case EDIT_TYPE.ACTION: {
        const activeTab = document.querySelector('.tabs__item.is-active');
        const skillIndex = activeTab
          ? Array.from(document.querySelectorAll('.tabs__item')).indexOf(
              activeTab,
            )
          : 0;

        const deletedActionIndex = user.skills[skillIndex].actions.indexOf(
          modalState.editing as ActionType,
        );
        const newSkills = [...user.skills];
        newSkills[skillIndex] = {
          ...newSkills[skillIndex],
          actions: newSkills[skillIndex].actions.filter(
            (action: ActionType, i: number) => i !== deletedActionIndex && action,
          ),
        };
        dispatch(updateUser({
          ...user,
          skills: newSkills,
        }));

        closeModal();
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className={`modal ${modalState.isOpen ? 'modal--open' : ''}`}
      onClick={onModalHandler}
    >
      <div className="modal__wrapper">
        <button type="button" className="modal__close" onClick={closeModal}>
          <CloseIcon></CloseIcon>
        </button>
        <h3 className="modal__title title">{modalState.title}</h3>
        <div className="modal__input input-wrapper">
          <input
            ref={inputRef}
            className={error.text ? 'is-invalid' : ''}
            type="text"
            required
            min="3"
            max="100"
            placeholder="Enter name"
            value={modalState.textInput}
            onChange={(e) => {
              setModalState({
                ...modalState,
                textInput: e.target.value.trim(),
              });
              setError({
                ...error,
                text: null,
              });
            }}
          />
          {error.text && <span className="modal__error error">{error.text}</span>}
        </div>
        {modalState.type === 'action' ? (
          <div className="modal__input input-wrapper">
            <input
              className={error.xp ? 'is-invalid' : ''}
              type="number"
              required
              min="1"
              max="100"
              placeholder="Enter xp"
              value={modalState.xpInput}
              onChange={(e) => {
                setModalState({
                  ...modalState,
                  xpInput: e.target.value.trim(),
                });
                setError({
                  ...error,
                  xp: null,
                });
              }}
            />
            {error.xp && <span className="modal__error error">{error.xp}</span>}
          </div>
        ) : null}
        <div className="modal__footer">
          <button
            className="modal__btn btn"
            type="button"
            onClick={modalState.editing ? edit : add}
          >
            <span>{modalState.btnText}</span>
          </button>
          {modalState.editing && (
            <button
              className="modal__btn btn btn--icon"
              type="button"
              onClick={deleteItem}
            >
              <DeleteIcon></DeleteIcon>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
