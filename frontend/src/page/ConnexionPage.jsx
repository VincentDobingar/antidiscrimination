import React from 'react';
import BenevoleLogin from '../components/BenevoleLogin';

const ConnexionPage = () => {
  const handleLoginSuccess = (userData) => {
    // Exemple : rediriger vers la page d'accueil après connexion
    window.location.href = '/';
  };

  return (
    <div className="container mt-5">
      <BenevoleLogin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default ConnexionPage;
