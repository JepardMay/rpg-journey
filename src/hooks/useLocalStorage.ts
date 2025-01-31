import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../reducers/loadingSlice';
import { StateType } from '../models';

export const useLocalStorage = (user: StateType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    localStorage.setItem('rpg-user-data', JSON.stringify(user));
    document.body.className = user.theme;
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [user]);
};
