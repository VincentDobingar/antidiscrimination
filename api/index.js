import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { limiter } from "./middlewares/rateLimitMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import signalementRoutes from './routes/signalementRoutes.js';
import benevoleRoutes from './routes/benevoleRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

import path from 'path'; // Ajoute import path (déjà inclus pour modules ES2020+)


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve(); // Pour avoir le chemin absolu

// Servir les fichiers du frontend (production build)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Middlewares de sécurité
app.use(helmet()); // Ajoute des headers de sécurité
app.use(cors({
  origin: 'http://localhost:3000', // À adapter en production
  credentials: true
}));
app.use(limiter); // Rate limiting global

app.use(express.json());

// Routes
app.use('/api/signalement', signalementRoutes);
app.use('/api/benevoles', benevoleRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => res.send('Anti discrimination Backend opérationnel !'));

// Middleware d'erreur (à la fin)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
