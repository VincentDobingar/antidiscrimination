import express from 'express';
import { body } from 'express-validator';
import { createSignalement, getSignalements } from '../controllers/signalementController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('motif').notEmpty().withMessage('Le motif est obligatoire'),
    body('description').notEmpty().withMessage('La description est obligatoire').isLength({ min: 10 }).withMessage('La description doit contenir au moins 10 caractères'),
    body('date').isISO8601().withMessage('La date doit être au format YYYY-MM-DD'),
    body('lieu').notEmpty().withMessage('Le lieu est obligatoire'),
    body('statut').isIn(['victime', 'temoin']).withMessage('Le statut doit être "victime" ou "temoin"'),
  ],
  createSignalement
);

router.get('/', getSignalements);

export default router;
