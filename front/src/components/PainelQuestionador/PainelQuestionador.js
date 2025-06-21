import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PainelQuestionador.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import defaultProfilePic from '../default-profile.png';
import ufmsLogo from '../ufms-logo.png';
import logoUfms from '../logo-ufms.png';
import imgCard1 from '../MinhasDuvidas.png';
import imgCard2 from '../DadosPessoais.png';

function PainelQuestionador() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        navigate('/login');
    };

    return (
        <div className="container-painel-questionador">
            <header className="painel-questionador-header">
                <div className="painel-questionador-header-esquerda">
                    <img
                        src={tiraDuvidasLogo}
                        alt="Tira Dúvidas Logo"
                        className="logo-painel-questionador"
                    />
                    <nav className="painel-questionador-header-nav">
                        <a href="/" className="painel-questionador-header-link">
                            Início
                        </a>
                        <a href="/sobre" className="painel-questionador-header-link">
                            Sobre Nós
                        </a>
                    </nav>
                </div>

                <div className="painel-questionador-header-direita">
                    <img src={defaultProfilePic} alt="Perfil" className="painel-questionador-icone-perfil" />
                    <span className="painel-questionador-ola-user">Olá username</span>
                </div>
            </header>

            <main className="painel-questionador-main">
                <h1 className="painel-questionador-titulo">Painel do Usuário</h1>

                <div className="painel-questionador-cards">
                    <div className="painel-questionador-card" onClick={() => navigate("/minhas-duvidas")}>
                        <img src={imgCard1} alt="Minhas Dúvidas" className="painel-questionador-card-img" />
                        <span className="painel-questionador-card-title">Minhas Dúvidas</span>
                    </div>

                    <div className="painel-questionador-card" onClick={() => navigate("/perfil")}>
                        <img src={imgCard2} alt="Meus Dados Pessoais" className="painel-questionador-card-img" />
                        <span className="painel-questionador-card-title">Meus Dados Pessoais</span>
                    </div>
                </div>

                <button className="painel-questionador-logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </main>

            <footer>
                <img src={logoUfms} alt="Logo UFMS" />
            </footer>
        </div>
    );
}

export default PainelQuestionador;