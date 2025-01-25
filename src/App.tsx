import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StateType } from './model';

import { initialState } from './constants/initialState';

// import PrivateRoute from './components/private-route/PrivateRoute';

import Main from './components/main/Main';
import Sign from './components/sign/Sign';
import Profile from './components/profile/Profile';
import Skills from './components/skills/Skills';
import Skill from './components/skills/Skill';
import History from './components/history/History';
import Themes from './components/themes/Themes';

function App() {
  const [user, setUser] = useState<StateType>(initialState);

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
          />,
        },
        {
          path: '/skills',
          element: (
            <Skills
              user={user}
              setUser={setUser}
            />
          ),
        },
        {
          path: '/skill',
          element: (
            <Skill
              user={user}
              setUser={setUser}
            />
          ),
        },
        {
          path: '/history',
          element: (
            <History
              user={ user }
              setUser={ setUser }
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
