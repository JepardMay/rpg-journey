import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import router from './router';
import { StateType } from './models';
import { useLocalStorage } from './hooks/useLocalStorage';

import Loading from './components/common/Loading';

function App() {
  const user = useSelector((state: { user: StateType }) => state.user);

  useLocalStorage(user);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
