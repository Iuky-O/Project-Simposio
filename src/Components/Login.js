import React, { useState } from "react";
import "../Styles/LoginStyles.css";
import { SiCodenewbie } from "react-icons/si";
import Image from "../Assets/Open Peeps - Bust.png";
import userPage from "./UserPages/UserPage";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 
    setIsLoading(true); 
  
    try {
      const response = await fetch('http://127.0.0.1:5001/simposio/us-central1/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', data.token);
  
        alert('Usuário autenticado com sucesso!');
        
        // Redirecionar o usuário para outra página
        window.location.href = {userPage};
      } else {
        setError(data.error || 'Erro na autenticação. Verifique seus dados.');
      }
    } catch (err) {
      setError('Erro de rede ou na API.');
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
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
            <form className="form-login" onSubmit={handleSubmit}>
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
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="navigation-buttons">
                <button type="submit" className="btn-login" disabled={isLoading}>
                  {isLoading ? 'Carregando...' : 'Login'}
                </button>
                <p>Ainda não tem conta? <Link to="/register"><span>Cadastre-se</span></Link></p>
              </div>
            </form>
          </div>
          <div className="section-info-login">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
