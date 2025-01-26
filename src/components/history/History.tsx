import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateUser } from '../../reducers/userSlice';

import {
  LEVEL_TYPE,
  SkillType,
  HistoryType
} from '../../models';
import { calculateLevel } from '../../utils/levels';

import Page from '../common/Page';

import { GoBackIcon } from '../icons/GoBackIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

import '../../assets/styles/components/history.css';

function History() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  
  useEffect(() => {
    const uncheckedItems = user.history.map((item: HistoryType) => {
      if (item.checked) item.checked = false;
      return item;
    });
    dispatch(updateUser({
      ...user,
      history: uncheckedItems,
    }));
  }, []);

  const groupHistoryByDate = (history: HistoryType[]) => {
    const groups: Record<string, HistoryType[]> = {
      "today": [],
      "yesterday": [],
      "this Week": [],
      "this Month": [],
      "this Year": [],
      "earlier": [],
    };

    for (let i = history.length - 1; i >= 0 ; i--) {
      const item = history[i];
      const now = new Date();
      const itemDate = new Date(item.date);
      const isToday = itemDate.toDateString() === now.toDateString();
      const isYesterday = itemDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
      const isThisWeek = itemDate > new Date(now.setDate(now.getDate() - now.getDay()));
      const isThisMonth = itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      const isThisYear = itemDate.getFullYear() === now.getFullYear();

      if (isToday) {
        groups["today"].push(item);
      } else if (isYesterday) {
        groups["yesterday"].push(item);
      } else if (isThisWeek) {
        groups["this Week"].push(item);
      } else if (isThisMonth) {
        groups["this Month"].push(item);
      } else if (isThisYear) {
        groups["this Year"].push(item);
      } else {
        groups["earlier"].push(item);
      }
    }

    return groups;
  };

  const formatDate = (dateString: string): string => {
    const date: Date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeekName = dayOfWeekNames[date.getDay()];

    return `${day} ${monthName} ${year}, ${dayOfWeekName}, ${hours}:${minutes}`;
  };

  const onDeleteClick = () => {
    let newUserXP = user.xp;
    user.history.forEach((item: HistoryType) => {
      if (item.checked) {
        newUserXP -= item.xp;
        const skill = user.skills.find((skill: SkillType) => skill.name === item.skill); // Find the skill by name
        if (skill) {
          const newSkillXP = (skill.xp - item.xp) > 0 ? (skill.xp - item.xp) : 0;
          skill.xp = newSkillXP; // Deduct the XP of the deleted item
          skill.level = calculateLevel(newSkillXP, LEVEL_TYPE.SKILL);
        }
      }
    });

    newUserXP = Math.max(newUserXP, 0);
    dispatch(updateUser({
      ...user,
      xp: newUserXP,
      level: calculateLevel(newUserXP, LEVEL_TYPE.USER),
      history: user.history.filter((item: HistoryType) => !item.checked),
    }));
  };


  const groupedHistory = groupHistoryByDate(user.history);

  // Function to select all items
  const selectAllItems = () => {
    const newHistory = user.history.map((item: HistoryType) => {
      return { ...item, checked: !item.checked };
    });
    dispatch(updateUser({ ...user, history: newHistory }));
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
            
            { user.history.length > 0 ?
              <div className="history__wrapper">
                <button className="btn btn--sm" onClick={ selectAllItems }>Select All</button>
                { user.history.some((item: HistoryType) => item.checked) && (
                  <button
                    className="modal__btn btn btn--icon"
                    type="button"
                    onClick={ onDeleteClick }
                  >
                    <DeleteIcon></DeleteIcon>
                  </button>) }
              </div> : <p className="history__text">Take an action to see a <b className="main-color">History</b> here!</p>
            }
          </div>
          <ul className="list">
            {/* Render grouped history */}
            {Object.keys(groupedHistory).map((group, index) => (
              groupedHistory[group].length > 0 && (
                <li key={ group }>
                  <h3 className="title title--sm">{ group.charAt(0).toUpperCase() + group.slice(1) }</h3>
                  <ul className="list">
                    {groupedHistory[group].map((item, i) => (
                      <li key={ i }>
                        <div key={`history-record-${index}${i}`} className="history-item">
                          <div className="history-item__checkbox">
                            <input
                              id={`history-record-${index}${i}`}
                              type="checkbox"
                              className="visually-hidden"
                              checked={item.checked}
                              onChange={() => {
                                const newHistory = [...user.history];
                                newHistory[newHistory.indexOf(item)].checked = !item.checked;
                                dispatch(updateUser({
                                  ...user,
                                  history: newHistory,
                                }));
                              }}
                            />
                            <label htmlFor={`history-record-${index}${i}`}></label>
                          </div>
                          <div className="history-item__wrapper">
                            <span className="history-item__skill">{item.skill}</span>
                            <span className="history-item__text">{item.text}</span>
                            <span className="history-item__xp">{item.xp}xp</span>
                            <time className="history-item__date" dateTime={formatDate(item.date)}>
                              {formatDate(item.date)}
                            </time>
                          </div>
                        </div>
                      </li>
                    )) }
                  </ul>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default History;
