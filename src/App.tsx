import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StateType } from './model';

import Profile from './components/profile/Profile';
import Skills from './components/skills/Skills';
import Skill from './components/skills/Skill';
import History from './components/history/History';
import Themes from './components/themes/Themes';

const levels = [
  0, 300, 900, 2700, 6500, 1400, 23000, 34000, 48000, 64000, 85000,
];

const calculateLevel = (xp: number) => {
  if (xp < levels[1]) return 1;
  if (xp >= levels[1] && xp < levels[2]) return 2;
  if (xp >= levels[2] && xp < levels[3]) return 3;
  if (xp >= levels[3] && xp < levels[4]) return 4;
  if (xp >= levels[4] && xp < levels[5]) return 5;
  if (xp >= levels[5] && xp < levels[6]) return 6;
  if (xp >= levels[6] && xp < levels[7]) return 7;
  if (xp >= levels[7] && xp < levels[8]) return 8;
  if (xp >= levels[8] && xp < levels[9]) return 9;
  if (xp >= levels[9] && xp < levels[10]) return 10;
  return 0;
};

const calculatePercent = (xp: number, level: number) => {
  return `${((xp - levels[level - 1]) * 100) / (levels[level] - levels[level - 1])}%`;
};

function App() {
  const initialValue = localStorage.getItem('rpg-user-data')
    ? JSON.parse(localStorage.getItem('rpg-user-data') || '""')
    : {
        name: 'Unknown',
        theme: 'theme-1',
        level: 1,
        xp: 0,
        skillsSorting: 'CC',
        actionsSorting: 'CC',
        activeTab: '',
        skills: [
          {
            name: 'Endurance',
            level: 1,
            xp: 0,
            actions: [
              {
                text: 'Run 10k',
                xp: 100,
              },
              {
                text: 'Skip leg-day',
                xp: -100,
              },
            ],
          },
          {
            name: 'Strength',
            level: 1,
            xp: 0,
            actions: [
              {
                text: 'Go to GYM',
                xp: 200,
              },
              {
                text: 'Lie in bed the whole day',
                xp: -200,
              },
            ],
          },
        ],
        history: [],
      };

  const [user, setUser] = useState<StateType>(initialValue);

  useEffect(() => {
    localStorage.setItem('rpg-user-data', JSON.stringify(user));
    document.body.classList.add(user.theme);
  }, [user]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Profile user={user} calculatePercent={calculatePercent} />,
    },
    {
      path: '/skills',
      element: (
        <Skills
          user={user}
          setUser={setUser}
          calculatePercent={calculatePercent}
        />
      ),
    },
    {
      path: '/skill',
      element: (
        <Skill
          user={user}
          setUser={setUser}
          calculateLevel={calculateLevel}
          calculatePercent={calculatePercent}
        />
      ),
    },
    {
      path: '/history',
      element: <History user={user} setUser={setUser} />,
    },
    {
      path: '/themes',
      element: <Themes user={user} setUser={setUser} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
