import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/public/Home";
import Presentation from "./page/public/Presentation";
import Contact from "./page/public/Contact";
import FormBenevole from "./page/public/FormBenevole";
import FormSignalement from "./page/public/FormSignalement";
import Dashboard from "./page/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ThemeProvider } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnexionPage from './page/ConnexionPage';
import { AuthProvider } from './hooks/useAuth';
import AboutCCREAA from './page/public/AboutCCREAA';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/benevole" element={<FormBenevole />} />
            <Route path="/signalement" element={<FormSignalement />} />
            <Route path="/connexion" element={<ConnexionPage />} />
            <Route path="/ccreaa" element={<AboutCCREAA />} />

            {/* Route protégée pour dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Supprimer la route ci-dessous, elle est redondante */}
            {/* <Route path="/dashboard" element={benevole ? <Dashboard /> : <Navigate to="/login" />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
