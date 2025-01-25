import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StateType } from './model';

// import PrivateRoute from './components/private-route/PrivateRoute';

import Main from './components/main/Main';
import Sign from './components/sign/Sign';
import Profile from './components/profile/Profile';
import Skills from './components/skills/Skills';
import Skill from './components/skills/Skill';
import History from './components/history/History';
import Themes from './components/themes/Themes';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: StateType }) => state.user);

  useEffect(() => {
    localStorage.setItem('rpg-user-data', JSON.stringify(user));
    document.body.classList.add(user.theme);
  }, [user, dispatch]);

  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Sign
        title="Sign Up"
        heading="Create an account to start gamifying your life!"
      />,
    },
    {
      path: '/login',
      element: <Sign
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
          element: <Profile/>,
        },
        {
          path: '/skills',
          element: (
            <Skills/>
          ),
        },
        {
          path: '/skill',
          element: (
            <Skill/>
          ),
        },
        {
          path: '/history',
          element: (
            <History/>
          ),
        },
    //   ],
    // },
    {
      path: '/themes',
      element: <Themes/>,
    },
  ]);

  return <RouterProvider router={ router } />;
}

export default App;
