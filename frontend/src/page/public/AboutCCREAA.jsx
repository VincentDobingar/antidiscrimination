import React from "react";
import { Link } from "react-router-dom";
import "./AboutCCREAA.css";

// 🔥 Corrige le bug (noTextShadow doit être déclaré avant utilisation)
const noTextShadow = {
  textShadow: "none",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
  backfaceVisibility: "hidden",
};

function AboutCCREAA() {
  // styles réutilisables
  const containerStyle = {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    paddingTop: "2rem",
    paddingBottom: "4rem",
  };

  const innerContainer = { maxWidth: 1100 };

  const heroStyle = {
    background: "linear-gradient(135deg, #142451 0%, #1e3a8a 100%)",
    borderRadius: "20px",
    padding: "3rem 2rem",
    color: "white",
    marginBottom: "3rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    ...noTextShadow,
  };

  const heroTitle = {
    fontSize: "2.4rem",
    fontWeight: 800,
    marginBottom: "1rem",
    textAlign: "center",
    lineHeight: 1.3,
    ...noTextShadow,
  };

  const heroSubtitle = {
    fontSize: "1.15rem",
    textAlign: "center",
    opacity: 0.96,
    maxWidth: 800,
    margin: "0 auto",
    lineHeight: 1.7,
    ...noTextShadow,
  };

  const missionCard = {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "2.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  };

  const missionTitle = {
    color: "#142451",
    fontWeight: "800",
    fontSize: "2.2rem",
    marginBottom: "1.5rem",
    borderBottom: "3px solid #142451",
    paddingBottom: "0.5rem",
    letterSpacing: "0.03em",
    ...noTextShadow,
  };

  const missionText = {
    fontSize: "1.1rem",
    lineHeight: "1.9",
    color: "#111",
    ...noTextShadow,
  };

  const servicesTitle = {
    color: "#142451",
    fontWeight: 800,
    fontSize: "2.1rem",
    marginBottom: "2rem",
    textAlign: "center",
    ...noTextShadow,
  };

  // card base style
  const cardBase = {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "2rem",
    height: "100%",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    willChange: "transform",
    backfaceVisibility: "hidden",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    textRendering: "optimizeLegibility",
  };

  return (
    <div style={containerStyle}>
      <div className="container" style={innerContainer}>

        {/* HERO */}
        <div style={heroStyle}>
          <h1 style={heroTitle}>
            Centre Culturel pour la Recherche et les Études Africaines et Arabes
          </h1>
          <p style={heroSubtitle}>
            Depuis 2006, un espace de liberté, de dialogue et d&apos;engagement
            au service du Tchad
          </p>
        </div>

        {/* MISSION */}
        <div className="row mb-5" style={missionCard}>
          <div className="col-md-12">
            <h2 style={missionTitle}>Notre Mission</h2>

            <p style={missionText}>
              Le CCREAA se veut le reflet du Tchad dans sa dimension plurielle.
              Nous sommes résolument engagés dans la culture du dialogue social,
              politique, culturel et religieux. Dans l&apos;optique de
              contribuer à l&apos;enracinement de la paix et du développement
              durable, le Centre propose diverses activités visant à promouvoir
              le civisme et la citoyenneté.
            </p>
          </div>
        </div>

        {/* SERVICES */}
        <h2 style={servicesTitle}>Nos Services</h2>

        <div className="row mb-5">

          {/* CARD 1 */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={cardBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#142451",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "1.9rem",
              }}>
                🎨
              </div>

              <h3 style={{ color: "#142451", fontWeight: "700", marginBottom: "1rem", ...noTextShadow }}>
                Ateliers Créatifs
              </h3>

              <p style={{ color: "#111", lineHeight: "1.7", ...noTextShadow }}>
                Un foisonnement d&apos;ateliers créatifs couvrant un large éventail...
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{ ...cardBase, padding: "2.5rem" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#142451",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "1.9rem",
              }}>
                📚
              </div>

              <h3 style={{ color: "#142451", fontWeight: 700, marginBottom: "1rem", ...noTextShadow }}>
                Bibliothèque & Formation
              </h3>

              <p style={{ color: "#111", lineHeight: 1.7, ...noTextShadow }}>
                Accès à une bibliothèque riche et un pôle d&apos;enseignement...
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={cardBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#142451",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "1.9rem",
              }}>
                📻
              </div>

              <h3 style={{ color: "#142451", fontWeight: 700, marginBottom: "1rem", ...noTextShadow }}>
                Médias & Communication
              </h3>

              <p style={{ color: "#111", lineHeight: 1.7, ...noTextShadow }}>
                Radio Al Bayane (93.3 FM), chaîne TV en développement...
              </p>
            </div>
          </div>

        </div>

        {/* ENGAGEMENTS */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "2.5rem",
          marginBottom: "3rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          <h2 style={{
            color: "#142451",
            fontWeight: "700",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            borderBottom: "3px solid #142451",
            paddingBottom: "0.5rem",
            ...noTextShadow,
          }}>
            Nos Engagements
          </h2>

          <div className="row">
            <div className="col-md-6">
              <ul style={{ fontSize: "1.05rem", lineHeight: "2", color: "#333" }}>
                <li>Promotion du dialogue social...</li>
                <li>Soutien au concept Genre...</li>
                <li>Lutte contre la corruption...</li>
                <li>Combat contre la pauvreté...</li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul style={{ fontSize: "1.05rem", lineHeight: "2", color: "#333" }}>
                <li>Protection de l'environnement</li>
                <li>Gestion des conflits</li>
                <li>Prévention de l'extrémisme</li>
                <li>Recherches de terrain</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PUBLIC CIBLE */}
        <h2 style={{
          color: "#142451",
          fontWeight: "700",
          fontSize: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
          ...noTextShadow,
        }}>
          Le CCREAA, pour qui ?
        </h2>

        <div className="row mb-4">

          {/* BOX 1 */}
          <div className="col-md-6 mb-3">
            <div style={{
              backgroundColor: "#142451",
              color: "white",
              borderRadius: "10px",
              padding: "1.5rem",
              height: "100%",
            }}>
              <h4 style={{ fontWeight: "700", marginBottom: "1rem", ...noTextShadow }}>🎭 Les Créatifs</h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                Espace de liberté, de travail et d'apprentissage...
              </p>
            </div>
          </div>

          {/* BOX 2 */}
          <div className="col-md-6 mb-3">
            <div style={{
              backgroundColor: "#142451",
              color: "white",
              borderRadius: "10px",
              padding: "1.5rem",
              height: "100%",
            }}>
              <h4 style={{ fontWeight: "700", marginBottom: "1rem", ...noTextShadow }}>🤝 Les Bénévoles</h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                Rejoignez notre équipe de bénévoles...
              </p>
            </div>
          </div>

          {/* BOX 3 */}
          <div className="col-md-6 mb-3">
            <div style={{
              backgroundColor: "#1e3a8a",
              color: "white",
              borderRadius: "10px",
              padding: "1.5rem",
              height: "100%",
            }}>
              <h4 style={{ fontWeight: "700", marginBottom: "1rem", ...noTextShadow }}>🏛️ Les Associations</h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                Collaborons ensemble...
              </p>
            </div>
          </div>

          {/* BOX 4 */}
          <div className="col-md-6 mb-3">
            <div style={{
              backgroundColor: "#1e3a8a",
              color: "white",
              borderRadius: "10px",
              padding: "1.5rem",
              height: "100%",
            }}>
              <h4 style={{ fontWeight: "700", marginBottom: "1rem", ...noTextShadow }}>🎯 Les Élus</h4>
              <p style={{ margin: 0, lineHeight: "1.6" }}>
                Partenaires essentiels...
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #142451 0%, #1e3a8a 100%)",
          borderRadius: "20px",
          padding: "3rem 2rem",
          textAlign: "center",
          color: "white",
          marginTop: "3rem",
          ...noTextShadow,
        }}>
          <h2 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
            Rejoignez l'aventure CCREAA
          </h2>

          <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.95 }}>
            Ensemble, construisons un Tchad de paix...
          </p>

          <Link
            to="/presentation"
            style={{
              display: "inline-block",
              backgroundColor: "white",
              color: "#142451",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "1.1rem",
              textDecoration: "none",
              transition: "transform 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Visitez notre site web →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AboutCCREAA;
