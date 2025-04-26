import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
      onClick={toggleDarkMode} 
      className="btn btn-link text-decoration-none"
      aria-label="Toggle dark mode"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;