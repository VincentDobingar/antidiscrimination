import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const BenevoleLogin = ({ onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate(); 
  const { login, token } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/benevoles/login', {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;
      localStorage.setItem('benevoleToken', token);
      login(token);
      // NE PAS naviguer ici
    } catch (error) {
      // gestion erreur
    }
  };

    // Redirige dès que le contexte a le token
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]); // navigue après mise à jour du context


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 shadow rounded bg-white"
        style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}
      >
        <h2 className="mb-4 text-primary text-center">Connexion Bénévole</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', {
              required: 'Email requis',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Format email invalide',
              },
            })}
            placeholder="exemple@domaine.com"
            autoComplete="username"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label d-flex justify-content-between align-items-center">
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', {
              required: 'Mot de passe requis',
              minLength: { value: 6, message: 'Au moins 6 caractères' },
            })}
            placeholder="Votre mot de passe"
            autoComplete="current-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Connexion...
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>
    </div>
  );
};

export default BenevoleLogin;
