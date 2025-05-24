import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelRespondente.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../default-profile.png'; // Imagem padrão

function PainelRespondente() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o username e o id do sessionStorage, redefine o estado e redireciona para a tela de login
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        navigate('/login');
    };

    return (
        <div className="container-respondente">
            <header className="perfil-respondente-header">
                <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-painel-respondente" />
                <h2 className="painel-respondente-title">Painel do Respondente</h2>
            </header>

            <div className="painel-respondente-card">
                <ul className="painel-respondente-lista">
                    <li className="painel-respondente-item">Dúvidas Respondidas</li>
                    <li className="painel-respondente-item"><button onClick={() => navigate(`/responder-duvidas`)}>Responder Dúvidas</button></li>
                    <li className="painel-respondente-item"><button onClick={() => navigate(`/perfil`)}>Meus Dados Pessoais</button></li>
                    {/* <li className="painel-respondente-item">Minhas Preferências</li>
                    <li className="painel-respondente-item">Auditar Respostas</li> */}
                    <button className="painel-respondente-sair" onClick={handleLogout}>Sair</button>
                </ul>
            </div>
        </div>
    );
}

export default PainelRespondente;