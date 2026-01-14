import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const BenevoleUpdateForm = ({ benevoleId, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    province: '',
    profession: '',
    disponibilite: '',
    motivation: '',
    password: '',
  });

   const provinces = [
    "N’Djamena",
    "Logone Occidental",
    "Logone Oriental",
    "Moyen-Chari",
    "Mandoul",
    "Tandjilé",
    "Lac",
    "Kanem",
    "Bahr el Gazel",
    "Hadjer-Lamis",
    "Chari-Baguirmi",
    "Guéra",
    "Salamat",
    "Mayo-Kebbi Est",
    "Mayo-Kebbi Ouest",
    "Ouaddaï",
    "Sila",
    "Wadi-Fira",
    "Ouara",
    "Ennedi Est",
    "Ennedi Ouest",
    "Borkou",
    "Tibesti"
  ]; 

  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBenevole = async () => {
      try {
        const token = localStorage.getItem('benevoleToken');
        const res = await fetch((process.env.REACT_APP_API_URL || '/api') + "/benevoles/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const text = await res.text();
        if (text && text.trim().startsWith('{')) {
          const data = JSON.parse(text);
          setFormData(prev => ({ ...prev, ...data.user }));
        } else {
          setError('Réponse serveur non JSON lors du chargement des données');
        }
      } catch (err) {
        setError('Impossible de charger les données du bénévole.');
      }
    };
    fetchBenevole();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('benevoleToken');
      const updatedData = { ...formData };
      if (!updatedData.password) delete updatedData.password;

      const res = await fetch(`/api/benevoles/${benevoleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const text = await res.text();
      if (text && text.trim().startsWith('{')) {
        const data = JSON.parse(text);
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message || 'Mise à jour réussie !');
          if (onUpdateSuccess) onUpdateSuccess();
        }
      } else {
        setError('Réponse serveur non JSON : ' + text);
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#28335a", color: "#fff" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Modifier les informations
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {loading && <CircularProgress sx={{ mb: 2 }} />}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              required
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              fullWidth
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{ position: "relative", zIndex: 2 }}>
            <TextField
              select
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              fullWidth
              SelectProps={{ MenuProps: { disablePortal: false } }}   // ← Essentiel !
              sx={{
                bgcolor: "#fff",
                minWidth: 220,
                fontSize: "1rem"
              }}
            >
              {provinces.map((province) => (
                <MenuItem key={province} value={province} sx={{ fontSize: "1rem" }}>
                  {province}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              fullWidth
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Disponibilité"
              name="disponibilite"
              value={formData.disponibilite}
              onChange={handleChange}
              fullWidth
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Mot de passe (laisser vide pour ne pas changer)"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              sx={{ bgcolor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Mettre à jour
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BenevoleUpdateForm;
