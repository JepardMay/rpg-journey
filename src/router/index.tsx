import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// import PrivateRoute from './PrivateRoute';

import Main from '../components/main/Main';
import Sign from '../components/sign/Sign';
import Profile from '../components/profile/Profile';
import Skills from '../components/skills/Skills';
import Skill from '../components/skills/Skill';
import History from '../components/history/History';
import Themes from '../components/themes/Themes';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Sign title="Sign Up" heading="Create an account to start gamifying your life!" />,
  },
  {
    path: '/login',
    element: <Sign title="Login" heading="Sign in to continue gamifying your life!" />,
  },
  {
    path: '/',
    element: <Main />,
  },
    // {
    //   element: <PrivateRoute />,
    //   children: [
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/skills',
    element: <Skills />,
  },
  {
    path: '/skill',
    element: <Skill />,
  },
  {
    path: '/history',
    element: <History />,
  },
    //   ],
    // },
  {
    path: '/themes',
    element: <Themes />,
  },
]);

export default router;
