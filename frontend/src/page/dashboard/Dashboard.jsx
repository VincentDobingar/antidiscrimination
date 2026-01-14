import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Box,
  Paper,
  Grid,
  TextField,
  Divider,
  LinearProgress,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../../components/LogoutButton";
import BenevoleUpdateForm from "../public/BenevoleUpdateForm";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Dashboard = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState(0);

  // Statistiques fictives pour l'affichage
  const stats = {
    signalementsTraites: 58,
    benevolesActifs: 14,
    heuresBenevolat: 120,
    actionsMenees: 8,
    objectifMois: 100,
    progression: 58
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch((process.env.REACT_APP_API_URL || '/api') + "/benevoles/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des données.");
        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUserData();
  }, [token]);

  const handleTabChange = (event, newValue) => setTab(newValue);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (error) return <Alert severity="error" sx={{ m: 5 }}>{error}</Alert>;

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 4,
        bgcolor: "#f4f6f8",
        borderRadius: 3,
        boxShadow: 2,
        minHeight: "80vh",
        p: { xs: 2, sm: 4 }
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
        Tableau de bord bénévole
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Bienvenue, {userData?.nom || userData?.email || "bénévole"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <LogoutButton />
      </Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{
          my: 3,
          ".MuiTab-root": { fontWeight: 600, textTransform: "none" }
        }}
      >
        <Tab label="Statistiques" />
        <Tab label="Mon profil" />
        <Tab label="Modifier mon profil" />
      </Tabs>

      {/* Onglet Statistiques */}
      <Box hidden={tab !== 0} sx={{ py: 3 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={700}>Statistiques</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GroupsIcon fontSize="large" />
                <Box>
                  <Typography variant="body1" fontWeight={500}>Signalements traités</Typography>
                  <Typography variant="h5">{stats.signalementsTraites}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GroupsIcon fontSize="large" />
                <Box>
                  <Typography variant="body1" fontWeight={500}>Bénévoles actifs</Typography>
                  <Typography variant="h5">{stats.benevolesActifs}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTimeIcon fontSize="large" />
                <Box>
                  <Typography variant="body1" fontWeight={500}>Heures de bénévolat</Typography>
                  <Typography variant="h5">{stats.heuresBenevolat}h</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEventsIcon fontSize="large" />
                <Box>
                  <Typography variant="body1" fontWeight={500}>Actions menées</Typography>
                  <Typography variant="h5">{stats.actionsMenees}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* Progression de l'objectif */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" mb={1}>
              Objectif du mois : {stats.objectifMois} signalements résolus
            </Typography>
            <LinearProgress
              variant="determinate"
              value={stats.progression}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="caption" mt={1} display="block">
              {stats.progression}% réalisé
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Onglet Profil (lecture seule) */}
      <Box hidden={tab !== 1} sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#28335a", color: "#fff" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Mon profil
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nom"
                value={userData?.nom || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                value={userData?.email || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Téléphone"
                value={userData?.telephone || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Province"
                value={userData?.province || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Profession"
                value={userData?.profession || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Disponibilité"
                value={userData?.disponibilite || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Motivation"
                value={userData?.motivation || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                multiline
                rows={2}
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Onglet Modifier */}
      <Box hidden={tab !== 2} sx={{ py: 3 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
            Modifier mon profil
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <BenevoleUpdateForm benevoleId={userData?.id} onUpdateSuccess={() => {}} />
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
