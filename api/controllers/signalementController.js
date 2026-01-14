import { validationResult } from 'express-validator';
import pool from '../config/db.js';

export const createSignalement = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { motif, description, date, lieu, statut } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO signalements (motif, description, date, lieu, statut) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [motif, description, date, lieu, statut]
    );
    res.status(201).json({ message: 'Signalement enregistré !', data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSignalements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM signalements');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération.' });
  }
};
