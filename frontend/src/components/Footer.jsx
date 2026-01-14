import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: darkMode ? '#a7c5eb' : '#142451',
        padding: '2rem 0',
        marginTop: '2rem'
      }}
    >
      <div className="container text-center" style={{ maxWidth: 800, margin: 'auto' }}>
        <div style={{ marginBottom: '1.2rem', fontWeight: 500 }}>
          Anti Discrimination • Plateforme associative
        </div>
        <div style={{ marginBottom: '.5rem' }}>
          <span>Siège social :</span> <span style={{ fontWeight: 600 }}>Quartier Gassi, Rue du lycée, N’Djamena, Tchad</span>
        </div>
        <div style={{ marginBottom: '.5rem' }}>
          <span>Téléphone :</span> <span>+235 65 12 34 56</span> &nbsp;|&nbsp; 
          <span>Email :</span> <span>contact@antidiscrim.td</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span>Localisation :</span> N’Djamena, République du Tchad
        </div>
        <hr style={{ background: darkMode ? '#12161d' : '#fff', opacity: 0.42 }} />
        <div style={{ fontSize: '0.95rem', marginTop: '1rem' }}>
          <span>Mentions légales :</span> Plateforme à but non lucratif • &copy; 2025 Tous droits réservés • Association ChadTech
        </div>
        <div style={{ fontSize: '0.95rem', marginTop: '1rem' }}>
          Suivez-nous sur :
          <span style={{ fontSize: '0.95rem', marginLeft: '1rem', marginRight: '1rem' }}>
            {/* Ici tu pourrais mettre des icônes réels si tu utilises MUI Icon ou fontawesome */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#12161d' : '#fff', marginRight: 15 }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#12161d' : '#fff', marginRight: 15 }}>Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#12161d' : '#fff' }}>LinkedIn</a>
          </span>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <a
            href="https://2bemalko.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem', // même taille que les lignes ci-dessus
              textDecoration: 'underline'
            }}
          >
            Développé par l'Agence TOBEMALKO
          </a>
        </div>
      </div>
    </footer>
  );
}
