import React from "react";
import { Link } from "react-router-dom";

function Presentation() {
  return (
    <div
      className="container mt-5 mb-5"
      style={{
        maxWidth: 900,
        lineHeight: "1.7",
        fontSize: "1.05rem",
        color: "#142451",
      }}
    >
      {/* Présentation générale du CCREAA avec mot du DGA */}
      <div className="row mb-5" style={{ alignItems: "flex-start" }}>
        {/* Texte du mot du DGA - Colonne gauche */}
        <div className="col-md-7 pr-4">
          <h2
            className="mb-4"
            style={{ fontWeight: "700", color: "#142451", fontSize: "1.8rem" }}
          >
            Bienvenue dans l'univers du CCREAA
          </h2>
          <p>
            Si tout le monde connaît les centres culturels, on n'a pas toujours 
            conscience de leur rôle exact, de la richesse de leur offre et de 
            la diversité de leurs interventions. Ni exclusivement lieux de 
            diffusion, ni simples espaces de rencontre, d'animation ou de 
            créativité, les centres culturels, comme le nôtre, contribuent à 
            renforcer les communautés locales et offrent à tous un accès à la 
            culture et aux possibilités d'épanouissement individuel et collectif.
          </p>
          <p>
            Actif depuis 2006, le Centre Culturel et de Recherche pour les 
            Études Africaines et Arabes (CCREAA) s'ancre résolument dans le 
            paysage culturel tchadien, en mettant les populations en mouvement 
            autour de questions qui dérangent, en forçant le débat sur des 
            enjeux de société et en suscitant des rencontres inédites.
          </p>
          <p>
            Avec sa bibliothèque, son pôle d'enseignement trilingue, sa station 
            de radio (Radio Al Bayane, 93.3 FM), sa chaîne de télévision en 
            construction et sa plateforme d'expression et de créativité, le 
            CCREAA s'inscrit dans une perspective d'éducation permanente.
          </p>
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "2px solid #e0e0e0" }}>
            <p style={{ fontStyle: "italic", fontWeight: "600", marginBottom: "0.5rem" }}>
              Dr Haggar Ahmat Mahamat
            </p>
            <p style={{ fontWeight: "700", color: "#142451", margin: 0 }}>
              Président Directeur Général du CCREAA
            </p>
          </div>
        </div>
        
        {/* Image du DGA - Colonne droite */}
        <div className="col-md-5 text-center">
          <div style={{ 
            borderRadius: "15px", 
            overflow: "hidden", 
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa"
          }}>
              <img
                src="/images/image.png"
                alt="Dr Haggar Ahmat Mahamat, PDG du CCREAA"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
          </div>
        </div>
      </div>

      {/* Présentation du Programme 3D */}
      <h2
        className="mb-4 mt-5"
        style={{ fontWeight: "700", color: "#142451", fontSize: "1.8rem" }}
      >
        Présentation du Programme 3D
      </h2>
      <p>
        Au Tchad, de nombreuses personnes sont quotidiennement victimes ou 
        témoins d'actes de discrimination, mais beaucoup ne savent pas quoi 
        faire ni à qui s'adresser pour réclamer justice ou réparation.
      </p>
      <p>
        Désormais, toute personne victime ou témoin d'une discrimination, 
        quel qu'en soit le motif ou le domaine, peut contacter directement et en 
        toute confidentialité les équipes du Programme 3D (Défense Des Droits) 
        du CCREAA.
      </p>

      {/* Comment ça marche */}
      <h2
        className="mb-4 mt-4"
        style={{ fontWeight: "700", color: "#142451", fontSize: "1.6rem" }}
      >
        Comment ça marche ?
      </h2>
      <p>
        Le travail des équipes du Programme 3D consiste à écouter, orienter et 
        accompagner les victimes ou témoins de discriminations afin d'agir au 
        mieux selon les besoins de chaque situation.
      </p>
      <p>
        La plateforme met à disposition un <strong>ANNUAIRE</strong> des{" "}
        <strong>BÉNÉVOLES</strong> formés dans 17 provinces sur les 23 du Tchad, 
        permettant de trouver facilement un interlocuteur proche pour un 
        accompagnement confidentiel et gratuit.
      </p>
      <p>
        Ces bénévoles collaborent avec les services de l'État, associations de 
        droits humains, syndicats, chefs traditionnels, leaders religieux, 
        avocats et médias.
      </p>

      {/* Ressources */}
      <h2
        className="mb-4 mt-4"
        style={{ fontWeight: "700", color: "#142451", fontSize: "1.6rem" }}
      >
        Ressources disponibles
      </h2>
      <ul>
        <li>Qu'est-ce qu'une discrimination ?</li>
        <li>Comment agir face à une discrimination ?</li>
        <li>Les lois tchadiennes contre la discrimination</li>
        <li>Services et associations à contacter</li>
        <li>Acteurs locaux et nationaux disponibles</li>
      </ul>

      {/* Illustration + lien */}
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <img
          src="/images/presentation-illustration.jpg"
          alt="Illustration Programme 3D"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Link
          to="/ccreaa"
          style={{
            color: "#142451",
            fontWeight: "600",
            fontSize: "1.2rem",
            textDecoration: "none",
            padding: "1rem 2rem",
            border: "2px solid #142451",
            borderRadius: "50px",
            display: "inline-block",
            transition: "all 0.3s ease",
          }}
        >
          En savoir plus sur le CCREAA →
        </Link>
      </div>
    </div>
  );
}

export default Presentation;
