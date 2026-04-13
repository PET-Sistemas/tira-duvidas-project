import React, { useState } from "react";
import "./Auth.css"; 
import "../Login/Logar.css"; // Importante: mantém seu estilo atual
import LogarContent from "../Login/LogarContent";
import CadastroContent from "../Cadastrar/CadastroContent";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page"> {/* Seu fundo azul atual */}
      <div className="login-container"> {/* Seu card branco atual */}
        
        {/* Lado Esquerdo - Fixo como na sua imagem */}
        <div className="login-left-panel">
          <img src={tiraDuvidasLogo} alt="Logo" className="login-logo" />
          <p className="login-description">
            <em>Tire suas dúvidas relacionadas à<br />TIC's com estudantes da UFMS</em>
          </p>
          <p className="login-footer-text">Projeto de ensino - PET-Sistemas</p>
        </div>

        <div className="login-divider"></div>

        {/* Lado Direito - Onde a mágica acontece */}
        <div className="login-right-panel">
          
          {/* Switch de botões */}
          <div className="auth-switch-container">
            <button 
              className={`auth-btn ${isLogin ? "active" : ""}`} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`auth-btn ${!isLogin ? "active" : ""}`} 
              onClick={() => setIsLogin(false)}
            >
              Cadastrar
            </button>
          </div>

          {/* Troca o formulário sem recarregar a página */}
          {isLogin ? <LogarContent /> : <CadastroContent onSuccess={() => setIsLogin(true)} />}
          
        </div>
      </div>
    </div>
  );
}

export default Auth;