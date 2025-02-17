import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelRespondente.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import defaultProfilePic from '../default-profile.png'; // Imagem padrão

function PainelRespondente() {
    return (
        <div className="container-respondente">
            <header className="perfil-respondente-header">
                <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-painel-respondente" />
                <h2 className="painel-respondente-title">Painel do Usuário</h2>
            </header>

            <div className="painel-respondente-card">
                <ul className="painel-respondente-lista">
                    <li className="painel-respondente-item">Dúvidas Respondidas</li>
                    <li className="painel-respondente-item">Responder Dúvidas</li>
                    <li className="painel-respondente-item">Meus Dados Pessoais</li>
                    <li className="painel-respondente-item">Minhas Preferências</li>
                    <li className="painel-respondente-item">Auditar Respostas</li>
                    <button className="painel-respondente-sair">Sair</button>
                </ul>
            </div>
        </div>
    );
}

export default PainelRespondente;