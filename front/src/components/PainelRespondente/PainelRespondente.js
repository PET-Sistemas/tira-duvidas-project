import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelRespondente.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../default-profile.png'; // Imagem padrão

import imgCard1 from '../DuvidasRespondidas.png';
import imgCard2 from '../ResponderDuvidas.png';
import imgCard3 from '../MinhasDuvidas.png';
import imgCard4 from '../DadosPessoais.png';
import ufmsLogo from '../ufms-logo.png';

function PainelRespondente() {
  return (
    <div className="container-respondente">
      <header className="perfil-respondente-header">
        <div className="header-esquerda">
          <img
            src={tiraDuvidasLogo}
            alt="Tira Dúvidas Logo"
            className="logo-painel-respondente"
          />
          <nav className="header-nav">
            <a href="/" className="header-link">
              Início
            </a>
            <a href="/sobre" className="header-link">
              Sobre Nós
            </a>
          </nav>
        </div>

        <div className="header-direita">
          <img src={defaultProfilePic} alt="Perfil" className="icone-perfil" />
          <span className="ola-user">Olá, User</span>
        </div>
      </header>

      <main className="painel-main">
        <h1 className="painel-titulo">Painel do Usuário</h1>

        <div className="painel-cards">
          <a href="/duvidas-respondidas" className="painel-card">
            <img src={imgCard1} alt="Dúvidas Respondidas" className="card-img" />
            <span className="card-title">Dúvidas Respondidas</span>
          </a>

          <a href="/responder-duvidas" className="painel-card">
            <img src={imgCard2} alt="Responder Dúvidas" className="card-img" />
            <span className="card-title">Responder Dúvidas</span>
          </a>

          <a href="/minhas-duvidas" className="painel-card">
            <img src={imgCard3} alt="Minhas Dúvidas" className="card-img" />
            <span className="card-title">Minhas Dúvidas</span>
          </a>

          <a href="/dados-pessoais" className="painel-card">
            <img src={imgCard4} alt="Meus Dados Pessoais" className="card-img" />
            <span className="card-title">Meus Dados Pessoais</span>
          </a>
        </div>

        <button className="logout-button">Logout</button>
      </main>

      <footer className="footer-respondente">
        <div className="footer-conteudo">
          <img src={ufmsLogo} alt="Logo rodapé" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
}

export default PainelRespondente;