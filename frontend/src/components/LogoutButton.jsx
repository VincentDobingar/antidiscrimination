// src/components/LogoutButton.jsx
import React from 'react';
import useAuth from '../hooks/useAuth';

export default function LogoutButton() {
  const { token, logout } = useAuth();

  // Affiche le bouton seulement si l'utilisateur est connecté
  if (!token) return null;

  return (
    <button onClick={logout}>
      Déconnexion
    </button>
  );
}
