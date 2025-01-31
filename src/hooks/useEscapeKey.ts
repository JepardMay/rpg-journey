import { useEffect, useCallback } from 'react';

export const useEscapeKey = (callback: () => void) => {
  const escFunction = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
};
