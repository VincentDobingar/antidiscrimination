import rateLimit from 'express-rate-limit';

// Limite 15 requêtes par 15 minutes
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Trop de requêtes depuis cette adresse IP, réessayez plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite spécifique pour les formulaires : 5 requêtes par 1 heure
export const formulaireLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Trop de soumissions. Réessayez dans 1 heure.',
  standardHeaders: true,
  legacyHeaders: false,
});
