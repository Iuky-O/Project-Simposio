import React, { useState } from "react";
import "../Styles/LoginStyles.css";
import { SiCodenewbie } from "react-icons/si";
import Image from "../Assets/Open Peeps - Bust.png";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../src/service/api'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Para exibir erros de autenticação

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir a página de recarregar

    try {
      const response =  await fetch('http://127.0.0.1:5001/simposio-df298/us-central1/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envia email e senha como JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso na autenticação
        alert('Usuário autenticado com sucesso:', data);
        // Aqui você pode redirecionar o usuário, armazenar tokens, etc.
      } else {
        // Falha na autenticação
        alert(data.error || 'Erro na autenticação'); // Exibir mensagem de erro
      }
    } catch (error) {
      alert('Erro de rede ou na API');
    }
  };
  return (
    <div className="login">
      <div className="container-login">
        <div className="sections-container-login">

          {/* Seção de formulário */}
          <div className="section-form-login">
            <div className="logo-container">
              <Link to="/" className="logo">
                <SiCodenewbie style={{ fontSize: '5rem', color: 'var(--Primary-Color)' }} />
              </Link>
            </div>
            <h1>Seja Bem-Vindo</h1>
            <p>Entre com seus dados!</p>
            <form className="form-login">
              <div className="inputs">
                <div className="input-group-login">
                  <input type="email" id="email" name="email" placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do emai
                  required />
                </div>
                
                {/* Campo de senha com ícone de olho */}
                <div className="input-group-login">
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                      required
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>} {/* Exibe erro, se houver */}
              <div className="navigation-buttons">
                <button type="submit" className="btn-login">Login</button>
                <p>Ainda não tem conta? <Link to="/register"><span>Cadastre-se</span></Link></p>
              </div>
            </form>
          </div>

          {/* Seção de informações */}
          <div className="section-info-login">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
