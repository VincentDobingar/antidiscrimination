import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/LogoAntiDis.png';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { token, benevole, logout } = useAuth();
  const displayName = benevole?.nom || benevole?.email || "";
  const navbarCollapse = useRef();

  // Fonction pour fermer le menu
  const closeMenu = () => {
    if (window.innerWidth < 992) { // bootstrap lg = 992px
      const collapse = navbarCollapse.current;
      if (collapse && collapse.classList.contains('show')) {
        collapse.classList.remove('show');
      }
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow fixed-top"
      style={{
        backgroundColor: '#001233',
        borderBottom: '3px solid #002466'
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo Anti Discrimination"
            width="40"
            height="40"
            className="mr-2 rounded-circle"
            style={{ background: '#f8f9fa' }}
          />
          <span className="fw-bold" style={{ color: '#fff' }}>
            Anti Discrimination
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#fff" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter: "invert(1)",
            }}
          />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar" ref={navbarCollapse}>
          <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                Accueil
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/presentation" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                Présentation
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/contact" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {token ? (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/dashboard" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/benevole" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                    Bénévole
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/signalement" style={{ color: '#fff', fontWeight: '600' }} onClick={closeMenu}>
                    Signalement
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center justify-content-end" style={{ gap: 12 }}>
            {!token ? (
              <Link
                to="/connexion"
                className="btn btn-primary"
                style={{ minWidth: 110 }}
                onClick={closeMenu}
              >
                Connexion
              </Link>
            ) : (
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>
                  {displayName}
                </span>
                <button
                  className="btn"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  style={{
                    fontWeight: 600,
                    backgroundColor: '#fff',
                    color: '#001233',
                    border: 'none',
                    minWidth: 110,
                  }}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
