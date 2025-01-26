// App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import router from './router';
import { StateType } from './models';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const user = useSelector((state: { user: StateType }) => state.user);

  useLocalStorage(user);

  return <RouterProvider router={router} />;
}

export default App;
