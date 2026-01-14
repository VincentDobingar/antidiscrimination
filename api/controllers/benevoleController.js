import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Créer un bénévole
export const createBenevole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom, email, telephone, province, profession, disponibilite, motivation, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO benevoles (nom, email, telephone, province, profession, disponibilite, motivation, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, nom, email',
      [nom, email, telephone, province, profession, disponibilite, motivation, hashedPassword]
    );
    
    // Génère un token JWT
    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ 
      message: 'Bénévole créé !', 
      token,
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire tous les bénévoles
export const getBenevoles = async (req, res) => {
  try {
    const result = await pool.query('SELECT nom, email, province, profession, disponibilite FROM benevoles');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération.' });
  }
};

// Login bénévole
export const loginBenevole = async (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN: Tentative avec email =", email);

  try {
    const result = await pool.query('SELECT * FROM benevoles WHERE email = $1', [email]);
    console.log("LOGIN: Résultat requête =", result.rows);

    if (result.rows.length === 0) {
      console.log("LOGIN: Email non trouvé");
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const benevole = result.rows[0];
    console.log("LOGIN: Mot de passe base =", benevole.password);

    // Vérifie la présence du mot de passe
    if (!benevole.password) {
      console.log("LOGIN: Mot de passe non défini/en base");
      return res.status(500).json({ error: "Mot de passe non défini pour cet utilisateur" });
    }

    // Compare avec bcrpyt
    const isPasswordValid = await bcrypt.compare(password, benevole.password);
    console.log("LOGIN: Password valid ?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // JWT
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      console.log("LOGIN: JWT env manquant");
      return res.status(500).json({ error: "Configuration token manquante" });
    }
    const token = jwt.sign(
      { id: benevole.id, email: benevole.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Connexion réussie", token, data: { id: benevole.id, email: benevole.email } });
  } catch (err) {
    console.error("LOGIN: Erreur catch =", err);
    res.status(500).json({ error: err.message });
  }
};


export const getProfil = async (req, res) => {
  try {
    // On prend l'id du bénévole connecté depuis le middleware d'authentification (exemple : req.user.id)
    const benevoleId = req.user.id;
    const result = await pool.query(
      'SELECT id, nom, email, telephone, province, profession, disponibilite, motivation FROM benevoles WHERE id = $1',
      [benevoleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bénévole non trouvé' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil.' });
  }
};


// Mise à jour d'un bénévole
export const updateBenevole = async (req, res) => {
  const benevoleId = req.params.id;
  const { nom, email, telephone, province, profession, disponibilite, motivation, password } = req.body;

  try {
    // Si le mot de passe est fourni, on le hash
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Construction de la requête dynamique selon champs présents
    const fields = [];
    const values = [];
    let index = 1;

    if (nom) { fields.push(`nom = $${index++}`); values.push(nom); }
    if (email) { fields.push(`email = $${index++}`); values.push(email); }
    if (telephone) { fields.push(`telephone = $${index++}`); values.push(telephone); }
    if (province) { fields.push(`province = $${index++}`); values.push(province); }
    if (profession) { fields.push(`profession = $${index++}`); values.push(profession); }
    if (disponibilite) { fields.push(`disponibilite = $${index++}`); values.push(disponibilite); }
    if (motivation) { fields.push(`motivation = $${index++}`); values.push(motivation); }
    if (hashedPassword) { fields.push(`password = $${index++}`); values.push(hashedPassword); }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Aucun champ à mettre à jour' });
    }

    values.push(benevoleId); // dernier paramètre pour WHERE

    const query = `UPDATE benevoles SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, nom, email, telephone, province, profession, disponibilite, motivation`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bénévole non trouvé' });
    }

    res.json({ message: 'Informations mises à jour avec succès', data: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

