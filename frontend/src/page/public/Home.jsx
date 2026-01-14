import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutCCREAA from "../public/AboutCCREAA";


import signalement from '../../assets/backgrounds/signalement.jpg';
import signalement1 from '../../assets/backgrounds/signalement1.jpg';
import signalement2 from '../../assets/backgrounds/signalement2.jpg';
import signalement3 from '../../assets/backgrounds/signalement3.jpg';
import signalement4 from '../../assets/backgrounds/signalement4.jpg';
import signalement5 from '../../assets/backgrounds/signalement5.jpg';
import signalement6 from '../../assets/backgrounds/signalement6.jpg';

const images = [signalement, signalement1, signalement2, signalement3, signalement4, signalement5, signalement6];

function Home() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="position-relative d-flex flex-column"
      style={{ 
        minHeight: "100vh", 
        overflow: "hidden",
        zIndex: 1,
        color: 'white',
        textShadow: '1px 1px 5px rgba(0,0,0,0.9)',
      }}
    >
      {/* Fond d'écran plein écran */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${images[backgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        transition: 'background-image 1.5s ease-in-out',
        filter: 'brightness(0.5)',
        zIndex: -1
      }} />

      <header className="text-center mt-5 pt-5 mb-5">
        <h1 className="display-4 font-weight-bold">Plateforme antidiscrimination.td</h1>
        <p className="lead">
          Bienvenue sur la plateforme dédiée à la défense et à la promotion des droits contre la discrimination au Tchad.
        </p>
      </header>
      <div className="d-flex justify-content-center mb-5 flex-wrap">
        <Link to="/signalement" className="m-2">
          <button className="btn btn-primary btn-lg">Signaler un cas</button>
        </Link>
        <Link to="/contact" className="m-2">
          <button className="btn btn-outline-light btn-lg">Trouver de l’aide</button>
        </Link>
      </div>
      {/* Section de présentation du CCREAA */}
          <AboutCCREAA />
    </div>
  );
}

export default Home;
