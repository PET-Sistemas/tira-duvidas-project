import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelQuestionador.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../default-profile.png'; // Imagem padrão

function PainelQuestionador() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o username e o id do sessionStorage, redefine o estado e redireciona para a tela de login
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        navigate('/login');
    };
    
    return (
        <div className="container-questionador">
            <header className="perfil-questionador-header">
                <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-painel-respondente" />
                <h2 className="painel-questionador-title">Painel do Questionador</h2>
            </header>

            <div className="painel-questionador-card">
                <ul className="painel-questionador-lista">
                    <li className="painel-questionador-item"><button onClick={() => navigate(`/minhas-duvidas`)}>Minhas Dúvidas</button></li>
                    <li className="painel-questionador-item"><button onClick={() => navigate(`/cadastroduvidas#`)}>Escrever Nova Dúvida</button></li>
                    <li className="painel-questionador-item"><button onClick={() => navigate(`/perfil`)}>Meus Dados Pessoais</button></li>
                    <button className="painel-questionador-sair" onClick={handleLogout}>Sair</button>
                </ul>
            </div>
        </div>
    );
}

export default PainelQuestionador;