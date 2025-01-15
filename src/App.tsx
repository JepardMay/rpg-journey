import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LevelObjectKeys } from './model';
import { StateType } from './model';

// import PrivateRoute from './components/private-route/PrivateRoute';

import Main from './components/main/Main';
import Sign from './components/sign/Sign';
import Profile from './components/profile/Profile';
import Skills from './components/skills/Skills';
import Skill from './components/skills/Skill';
import History from './components/history/History';
import Themes from './components/themes/Themes';

const levels:LevelObjectKeys = {
  skill: [0, 300, 900, 2700, 6500, 1400, 23000, 34000, 48000, 64000, 85000],
  user: [0, 300, 900, 2700, 6500, 1400, 23000, 34000, 48000, 64000, 85000],
};

const calculateLevel = (xp: number, type: string) => {
  const points: number[] = levels[type];
  
  if (!points) {
    throw new Error(`Invalid type: ${type}`);
  }

  if (xp < points[0]) return 1;
  for (let i = 0; i < points.length; i++) {
    if (xp >= points[i] && xp < points[i + 1]) {
      return i + 1;
    }
  }
  return points.length;
};

const calculatePercent = (xp: number, level: number, type: string) => {
  const points: number[] = levels[type];
  
  if (!points) {
    throw new Error(`Invalid type: ${type}`);
  }

  return `${((xp - points[level - 1]) * 100) / (points[level] - points[level - 1])}%`;
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
      path: '/signup',
      element: <Sign
        user={user}
        setUser={setUser}
        title="Sign Up"
        heading="Create an account to start gamifying your life!"
      />,
    },
    {
      path: '/login',
      element: <Sign
        user={user}
        setUser={setUser}
        title="Login"
        heading="Sign in to continue gamifying your life!"
      />,
    },
    {
      path: '/',
      element: <Main/>,
    },
    // {
    //   element: <PrivateRoute />,
    //   children: [
        {
          path: '/profile',
          element: <Profile
            user={ user }
            calculatePercent={ calculatePercent }
          />,
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
          element: (
            <History
              user={ user }
              setUser={ setUser }
              calculateLevel={ calculateLevel }
            />
          ),
        },
    //   ],
    // },
    {
      path: '/themes',
      element: <Themes user={user} setUser={setUser} />,
    },
  ]);

  return <RouterProvider router={ router } />;
}

export default App;
