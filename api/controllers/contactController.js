import { validationResult } from 'express-validator';
import pool from '../config/db.js';

export const createContact = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom, email, sujet, message, recontact } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (nom, email, sujet, message, recontact) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nom, email, sujet, message, recontact || false]
    );
    return res.status(201).json({ message: "Message envoyé !", data: result.rows[0] });
  } catch (err) {
    console.error("createContact error:", err);
    // Renvoie un tableau d'erreurs similaire aux autres routes
    return res.status(500).json({ errors: [{ msg: 'Erreur serveur: ' + err.message }] });
  }
};

export const getContacts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts');
    res.json(result.rows);
  } catch (err) {
    console.error("getContacts error:", err);
    res.status(500).json({ errors: [{ msg: 'Erreur lors de la récupération.' }] });
  }
};
