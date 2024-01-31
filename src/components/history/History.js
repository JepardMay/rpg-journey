import React from 'react';
import { NavLink } from 'react-router-dom';

import Page from '../Page';
import GoBackIcon from '../skills/GoBackIcon';

import './history.css';

function History({ user, setUser }) {
  const formatDate = (date) => {
    if (typeof date !== 'object') {
      date = new Date(date);
    }

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear(); 
    let hour = date.getHours();
    let minutes = date.getMinutes();

    return `${day}/${month + 1}/${year} - ${hour}:${minutes}`;
  }

  return (
    <Page title='History'>
      <div className="container">
        <div className="history">
          <NavLink to="/" className="link link--go-back">
            <GoBackIcon></GoBackIcon>
          </NavLink>
          <h2 className="title">History</h2>
          <ul className="list">
            {user.history.slice(0).reverse().map((item, i) => (
              <li className="item" key={`history-record-${i}`}>
                <div className="history-item">
                  <div className="history-item__checkbox">
                    <input id={`history-record-${i}`} type="checkbox" className='visually-hidden' />
                    <label htmlFor={`history-record-${i}`}></label>
                  </div>
                  <div className="history-item__wrapper">
                    <span className='history-item__text'>{item.text}</span>
                    <span className='history-item__xp'>{item.xp}xp</span>
                    <time className='history-item__date' dateTime={item.date}>{formatDate(item.date)}</time>
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
