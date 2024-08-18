import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { StateType } from '../../model';

import Page from '../Page';

import { GoBackIcon } from '../icons/GoBackIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

import './history.css';

interface Props {
  user: StateType;
  setUser: (user: StateType) => void;
}

function History({ user, setUser }: Props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const uncheckedItems = user.history.map((item) => {
      if (item.checked) item.checked = false;
      return item;
    });
    setUser({
      ...user,
      history: uncheckedItems,
    });
  }, []);

  const formatDate = (date: Date) => {
    if (typeof date !== 'object') {
      date = new Date(date);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month + 1}/${year} - ${hour}:${minutes}`;
  };

  const onDeleteClick = () => {
    // to do: remove xp of deleted item from skills
    setUser({
      ...user,
      history: user.history.filter((item) => !item.checked),
    });
  };

  return (
    <Page title="History">
      <div className="container">
        <div className="history">
          <button onClick={ () => navigate(-1) } className="link link--go-back">
            <GoBackIcon></GoBackIcon>
          </button>
          <div className="history__header">
            <h2 className="title">History</h2>
            {user.history.length > 0 &&
            user.history.some((item) => item.checked) ? (
              <button
                className="modal__btn btn btn--icon"
                type="button"
                onClick={onDeleteClick}
              >
                <DeleteIcon></DeleteIcon>
              </button>
            ) : (
              ''
            )}
          </div>
          <ul className="list">
            {user.history
              .slice(0)
              .reverse()
              .map((item, i) => (
                <li className="item" key={`history-record-${i}`}>
                  <div className="history-item">
                    <div className="history-item__checkbox">
                      <input
                        id={`history-record-${i}`}
                        type="checkbox"
                        className="visually-hidden"
                        checked={item.checked}
                        onChange={() => {
                          const newHistory = [...user.history];
                          newHistory[newHistory.indexOf(item)].checked =
                            !item.checked;
                          setUser({
                            ...user,
                            history: newHistory,
                          });
                        }}
                      />
                      <label htmlFor={`history-record-${i}`}></label>
                    </div>
                    <div className="history-item__wrapper">
                      <span className="history-item__text">{item.text}</span>
                      <span className="history-item__xp">{item.xp}xp</span>
                      <time
                        className="history-item__date"
                        dateTime={formatDate(item.date)}
                      >
                        {formatDate(item.date)}
                      </time>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default History;
