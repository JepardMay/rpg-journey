import { useState, useEffect, useRef } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';

export const useMenuToggle = () => {
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuState(prev => !prev);
    toggleRef.current?.blur();
  };
  const closeMenu = () => setMenuState(false);
  
  useEscapeKey(closeMenu);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (menuState && !menuRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuState]);

  return { menuState, toggleMenu, closeMenu, setMenuState, menuRef, toggleRef };
};
