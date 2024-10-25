import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../Styles/LoginStyles.css";
import { SiCodenewbie } from "react-icons/si";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "../Scripts/AuthContext";

const Login = () => {
  const MAX_ATTEMPTS = 5; 
  const [attempts, setAttempts] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const userLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Todos os campos devem ser preenchidos!');
      return;
    } else if (attempts >= MAX_ATTEMPTS) {
      alert('Você atingiu o número máximo de tentativas. Tente novamente mais tarde.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        setAttempts(0);
        navigate('/'); 
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message || "Erro ao efetuar login! Email ou Senha está errado!");
      setAttempts(prevAttempts => prevAttempts + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container-login">
        <div className="sections-container-login">
          <div className="section-form-login">
            <div className="logo-container">
              <Link to="/" className="logo">
                <SiCodenewbie style={{ fontSize: '5rem', color: 'var(--Primary-Color)' }} />
              </Link>
            </div>
            <h1>Seja Bem-Vindo</h1>
            <p>Entre com seus dados!</p>
            <form className="form-login" onSubmit={userLogin}>
              <div className="inputs">
                <div className="input-group-login">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={error ? 'input-error' : ''}
                  />
                </div>
                <div className="input-group-login">
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={error ? 'input-error' : ''}
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility} data-testid="toggle-password-visibility">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="navigation-buttons">
                <button type="submit" className="btn-login" disabled={loading}>
                  {loading ? 'Carregando...' : 'Login'}
                </button>
                <p>Ainda não tem conta? <Link to="/register"><span>Cadastre-se</span></Link></p>
              </div>
            </form>
          </div>
          <div className="section-info-login"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
