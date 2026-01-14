import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  Box,
  Typography
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

function Contact() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
    recontact: false
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    setMessage("");
    setLoading(true);

    fetch((process.env.REACT_APP_API_URL || '/api') + "/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(text => {
        console.log("Réponse brute du serveur (contacts) :", text);
        if (text && text.trim().startsWith('{')) {
          try {
            const data = JSON.parse(text);
            setLoading(false);
            if (data.errors) {
              setErrors(data.errors.map(e => e.msg));
            } else if (data.error) {
              setMessage("");
              setErrors([data.error]);
            } else {
              setMessage(data.message || "Message envoyé !");
              setForm({ nom: "", email: "", sujet: "", message: "", recontact: false });
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
        console.error("Fetch error (contacts):", err);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<MailIcon sx={{ fontSize: 40, color: "#0288d1" }} />}
          title="Nous contacter"
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
              label="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
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
            />
            <TextField
              label="Sujet"
              name="sujet"
              value={form.sujet}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={5}
              placeholder="Écrivez votre message..."
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="recontact"
                  checked={form.recontact}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Je souhaite être recontacté"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Les champs marqués * sont obligatoires.
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Contact;
