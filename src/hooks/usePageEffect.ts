import { useEffect } from 'react';

export const usePageEffect = (title: string, pathname: string) => {
  useEffect(() => {
    document.title = pathname === '/' ? title : `${title} | JOURNEY`;
    window.scrollTo(0, 0);
  }, [title, pathname]);
};
