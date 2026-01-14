import React, { useState } from "react";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function FormBenevole() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    province: "",
    profession: "",
    disponibilite: "",
    motivation: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    setMessage("");
    setLoading(true);

    fetch((process.env.REACT_APP_API_URL || '/api') + "/benevoles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.text()) // Lire la réponse brute
      .then(text => {
        console.log("Réponse brute du serveur :", text);
        if (text && text.trim().startsWith('{')) { // Vérification simple avant JSON.parse
          try {
            const data = JSON.parse(text);
            setLoading(false);
            if (data.errors) {
              setErrors(data.errors.map(e => e.msg));
            } else if (data.token) {
              login(data.token);
              setMessage(data.message || "Inscription réussie !");
              setForm({
                nom: "",
                email: "",
                telephone: "",
                province: "",
                profession: "",
                disponibilite: "",
                motivation: "",
                password: ""
              });
              setTimeout(() => navigate("/dashboard"), 700); 
            }
          } catch (err) {
            setLoading(false);
            setMessage("Erreur lors du traitement de la réponse JSON.");
            console.error("Erreur JSON.parse :", err);
          }
        } else {
          setLoading(false);
          setMessage("Réponse serveur non JSON : " + text);
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage("Erreur lors de l'envoi : " + err.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<PersonAddIcon sx={{ fontSize: 40, color: "#1976d2" }} />}
          title="S'inscrire en tant que bénévole"
          titleTypographyProps={{ variant: "h5" }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
        <CardContent sx={{ pt: 3 }}>
          {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.map((err, i) => (
                <div key={i}>❌ {err}</div>
              ))}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ✅ {message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nom complet"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              disabled={loading}
            />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              disabled={loading}
            />
            <TextField
              label="Téléphone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              disabled={loading}
            />
            <FormControl fullWidth required disabled={loading}>
              <InputLabel>Province</InputLabel>
              <Select
                name="province"
                value={form.province}
                onChange={handleChange}
                label="Province"
              >
                <MenuItem value="">--Choisir--</MenuItem>
                <MenuItem value="Guéra">Guéra</MenuItem>
                <MenuItem value="Mayo-Kebbi Est">Mayo-Kebbi Est</MenuItem>
                <MenuItem value="Mayo-Kebbi Ouest">Mayo-Kebbi Ouest</MenuItem>
                <MenuItem value="Logone Occidental">Logone Occidental</MenuItem>
                <MenuItem value="Logone Oriental">Logone Oriental</MenuItem>
                <MenuItem value="Moyen-Chari">Moyen-Chari</MenuItem>
                <MenuItem value="N'Djamena">N'Djamena</MenuItem>
                <MenuItem value="Ouaddaï">Ouaddaï</MenuItem>
                <MenuItem value="Salamat">Salamat</MenuItem>
                <MenuItem value="Tandjilé">Tandjilé</MenuItem>
                <MenuItem value="Wadi Fira">Wadi Fira</MenuItem>
                <MenuItem value="Batha">Batha</MenuItem>
                <MenuItem value="Borkou">Borkou</MenuItem>
                <MenuItem value="Ennedi">Ennedi</MenuItem>
                <MenuItem value="Tibesti">Tibesti</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Profession"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={loading}
            />
            <TextField
              label="Disponibilité"
              name="disponibilite"
              placeholder="Ex: Lun-Ven, 9h-17h"
              value={form.disponibilite}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={loading}
            />
            <TextField
              label="Pourquoi devenir bénévole ?"
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
              disabled={loading}
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              disabled={loading}
              helperText="Au moins 6 caractères"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Inscription en cours..." : "S'inscrire maintenant"}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Un email de confirmation sera envoyé après l'inscription.
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
}

export default FormBenevole;
