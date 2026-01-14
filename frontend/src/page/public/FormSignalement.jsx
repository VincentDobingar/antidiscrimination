import React, { useState } from "react";
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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Box,
  Typography
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

function FormSignalement() {
  const [form, setForm] = useState({
    motif: "",
    description: "",
    date: "",
    lieu: "",
    statut: ""
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

    fetch((process.env.REACT_APP_API_URL || '/api') + "/signalement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.text()) // Lire en texte brut
      .then(text => {
        console.log("Réponse brute du serveur :", text);
        if (text && text.trim().startsWith('{')) {
          try {
            const data = JSON.parse(text);
            setLoading(false);
            if (data.errors) {
              setErrors(data.errors.map(e => e.msg));
            } else {
              setMessage(data.message || "Signalement envoyé !");
              setForm({ motif: "", description: "", date: "", lieu: "", statut: "" });
            }
          } catch (err) {
            setLoading(false);
            setMessage("Réponse serveur non JSON : " + text);
            console.error("Ce n'est pas du JSON :", err);
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
          avatar={<ReportProblemIcon sx={{ fontSize: 40, color: "#d32f2f" }} />}
          title="Signaler une discrimination"
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
            <FormControl fullWidth required>
              <InputLabel>Motif de la discrimination</InputLabel>
              <Select
                name="motif"
                value={form.motif}
                onChange={handleChange}
                label="Motif de la discrimination"
              >
                <MenuItem value="">--Choisir--</MenuItem>
                <MenuItem value="sexe">Sexe</MenuItem>
                <MenuItem value="age">Âge</MenuItem>
                <MenuItem value="origine">Origine</MenuItem>
                <MenuItem value="religion">Religion</MenuItem>
                <MenuItem value="handicap">Handicap</MenuItem>
                <MenuItem value="autre">Autre</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description de l'incident"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={5}
              placeholder="Décrivez les faits, le contexte..."
              variant="outlined"
            />
            <TextField
              label="Date de l'incident"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
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
            <FormControl required>
              <FormLabel>Êtes-vous ?</FormLabel>
              <RadioGroup
                name="statut"
                value={form.statut}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="victime"
                  control={<Radio />}
                  label="Victime"
                />
                <FormControlLabel
                  value="temoin"
                  control={<Radio />}
                  label="Témoin"
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="error"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Envoi en cours..." : "Envoyer le signalement"}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Toutes les données sont traitées de manière strictement confidentielle.
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
}

export default FormSignalement;
