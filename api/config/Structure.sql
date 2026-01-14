CREATE TABLE signalements (
  id SERIAL PRIMARY KEY,
  motif VARCHAR(255),
  description TEXT,
  date DATE,
  lieu VARCHAR(255),
  statut VARCHAR(50)
);


CREATE TABLE benevoles (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255),
  email VARCHAR(255),
  telephone VARCHAR(50),
  province VARCHAR(100),
  profession VARCHAR(255),
  disponibilite VARCHAR(255),
  motivation TEXT,
  password TEXT -- à hasher en production !
);


CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255),
  email VARCHAR(255),
  sujet VARCHAR(255),
  message TEXT,
  recontact BOOLEAN
);
