export const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);
  
  // Erreur de validation
  if (err.status === 400) {
    return res.status(400).json({ error: err.message });
  }
  
  // Erreur d'authentification
  if (err.status === 401 || err.status === 403) {
    return res.status(err.status).json({ error: err.message });
  }
  
  // Erreur serveur générique
  res.status(500).json({ error: 'Erreur serveur interne' });
};
