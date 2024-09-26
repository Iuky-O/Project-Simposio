import React, { useState } from "react";
import "../Styles/LoginStyles.css";
import { SiCodenewbie } from "react-icons/si";
import Image from "../Assets/Open Peeps - Bust.png";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
                  <input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                
                {/* Campo de senha com ícone de olho */}
                <div className="input-group-login">
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
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
