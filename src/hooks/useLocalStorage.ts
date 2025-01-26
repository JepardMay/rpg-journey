import { useEffect } from 'react';
import { StateType } from '../models';

export const useLocalStorage = (user: StateType) => {
  useEffect(() => {
    localStorage.setItem('rpg-user-data', JSON.stringify(user));
    document.body.classList.add(user.theme);

    return () => {
      document.body.classList.remove(user.theme);
    };
  }, [user]);
};
