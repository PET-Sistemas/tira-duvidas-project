import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelRespondente.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import imgCard1 from "../../../utils/images/DuvidasRespondidas.png";
import imgCard2 from "../../../utils/images/ResponderDuvidas.png";
import imgCard3 from "../../../utils/images/MinhasDuvidas.png";
import imgCard4 from "../../../utils/images/DadosPessoais.png";

function PainelRespondente() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="container-respondente">
      <header className="header-global">
        <nav className="header-global-nav">
          <a href="/" className="app-home-logo-link">
            <img
              src={tiraDuvidasLogo}
              alt="Tira Dúvidas Logo"
              className="logo-cadasroDuvidas"
            />
          </a>

          <a href="/" className="nav-bar-item">
            <i className="bi bi-house-door-fill"></i>Início
          </a>
          <a href="sobrenos" className="nav-bar-item">
            <i className="bi bi-people-fill"></i>Sobre nós
          </a>

          <a href="/perfil" className="profile-btn">
            <img
              src={defaultProfilePic}
              alt="icon-profile"
              className="user-profile-img"
            />
          </a>
        </nav>
      </header>

      <main className="painel-main">
        <h1 className="painel-titulo">Painel do Usuário</h1>

        <div className="cards">
          <a href="/duvidas-respondidas" className="card">
            <img
              src={imgCard1}
              alt="Dúvidas Respondidas"
              className="card-img"
            />
            <span className="card-title">Dúvidas Respondidas</span>
          </a>

          <a href="/responder-duvidas" className="card">
            <img src={imgCard2} alt="Responder Dúvidas" className="card-img" />
            <span className="card-title">Responder Dúvidas</span>
          </a>

          <a href="/minhas-duvidas" className="card">
            <img src={imgCard3} alt="Minhas Dúvidas" className="card-img" />
            <span className="card-title">Minhas Dúvidas</span>
          </a>

          <a href="/perfil" className="card">
            <img
              src={imgCard4}
              alt="Meus Dados Pessoais"
              className="card-img"
            />
            <span className="card-title">Meus Dados Pessoais</span>
          </a>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </main>

      <footer className="footer">
        <img src={logoUfms} alt="Logo UFMS" />
      </footer>
    </div>
  );
}

export default PainelRespondente;
