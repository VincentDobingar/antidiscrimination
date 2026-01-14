import express from 'express';
import { body } from 'express-validator';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('nom').notEmpty().withMessage('Le nom est obligatoire'),
    body('email').isEmail().withMessage('Email invalide'),
    body('sujet').notEmpty().withMessage('Le sujet est obligatoire'),
    body('message').notEmpty().withMessage('Le message est obligatoire').isLength({ min: 10 }).withMessage('Le message doit contenir au moins 10 caractères'),
  ],
  createContact
);

router.get('/', getContacts);

export default router;
