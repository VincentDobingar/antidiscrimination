import React, { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  // Vérifie en localStorage la préférence existante, sinon mode clair par défaut
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('dark-mode');
    return stored === 'true' ? true : false;
  });

  // Applique la classe dark-mode au body au chargement et quand darkMode change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('dark-mode', darkMode.toString());
  }, [darkMode]);

  // Bascule entre clair et sombre
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Basculer mode clair/sombre"
      className="btn btn-navy"
      style={{ position: 'fixed', top: 15, right: 15, zIndex: 1050 }}
    >
      {darkMode ? 'Mode Clair' : 'Mode Sombre'}
    </button>
  );
}
