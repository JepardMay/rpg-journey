import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../reducers/loadingSlice';

export const usePageEffect = (title: string, pathname: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const updatePageDetails = () => {
      document.title = pathname === '/' ? title : `${title} | JOURNEY`;
      window.scrollTo(0, 0);
    };

    updatePageDetails();

    dispatch(setLoading(false));
  }, [title, pathname, dispatch]);
};
