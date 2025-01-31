import React from "react";

interface Props {
  number: number;
  isActive: boolean;
  onClick: () => void;
}

const ThemeButton = ({ number, isActive, onClick }: Props) => {
  const themeClass = `theme-${number}`;
  const buttonClassName = `theme-btn ${themeClass} ${isActive ? 'active' : ''}`;
  
  return (
    <li className="item">
      <button
        className={buttonClassName}
        type="button"
        onClick={onClick}
      />
    </li>
  );
};

export default ThemeButton;
