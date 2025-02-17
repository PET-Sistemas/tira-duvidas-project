import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelQuestionador.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import defaultProfilePic from '../default-profile.png'; // Imagem padrão

function PainelQuestionador() {
    return (
        <div className="container-questionador">
            <header className="perfil-questionador-header">
                <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-painel-respondente" />
                <h2 className="painel-questionador-title">Painel do Usuário</h2>
            </header>

            <div className="painel-questionador-card">
                <ul className="painel-questionador-lista">
                    <li className="painel-questionador-item">Minhas Dúvidas</li>
                    <li className="painel-questionador-item">Escrever Nova Dúvida</li>
                    <li className="painel-questionador-item">Meus Dados Pessoais</li>
                    
                    <button className="painel-questionador-sair">Sair</button>
                </ul>
            </div>
        </div>
    );
}

export default PainelQuestionador;