import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  createBenevole,
  getBenevoles,
  loginBenevole,
  updateBenevole,
  getProfil
} from '../controllers/benevoleController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { formulaireLimiter } from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

// Création bénévole
router.post(
  '/',
  formulaireLimiter,
  [
    body('nom').notEmpty().withMessage('Le nom est obligatoire'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  ],
  createBenevole
);

// Connexion bénévole
router.post('/login', formulaireLimiter, loginBenevole);

// Liste bénévoles
router.get('/', getBenevoles);

// *** Profil bénévole : UNE SEULE ROUTE ***
router.get('/profile', verifyToken, getProfil);

// Mise à jour bénévole
router.put(
  '/:id',
  verifyToken,
  [
    body('email').optional().isEmail().withMessage('Email invalide'),
    body('password').optional().isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  ],
  updateBenevole
);

export default router;
