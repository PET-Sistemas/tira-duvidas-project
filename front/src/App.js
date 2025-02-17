import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Logar.js';
import Signup from './components/Cadastrar/Cadastro.js';
import CadastroDuvidas from './components/CadastrarDuvidas/CadastroDuvidas.js';
import PerfilUsuario from './components/Perfil/Perfil.js';
import MinhasDuvidas from './components/MinhasDuvidas/MinhasDuvidas.js';
import ResponderDuvidas from './components/ResponderDuvidas/ResponderDuvidas.js';
import PainelQuestionador from './components/PainelQuestionador/PainelQuestionador.js';
import PainelRespondente from './components/PainelRespondente/PainelRespondente.js';
import './App.css'; 
import tiraDuvidasLogo from './components/Logo-Tira-Dúvidas-removebg.png';
import MinhasDuvidasDetalhe from './components/MinhasDuvidasDetalhe/MinhasDuvidasDetalhe.js';


function App() {
  const navigate = useNavigate();

  return (
    <div className="app-home">
      <header className="app-home-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <nav className="app-home-nav">
          <a href="#sobre" className="app-home-nav-link">Sobre nós</a>
          <a href="#perguntas-frequentes" className="app-home-nav-link">Perguntas Frequentes</a>
          <div className="app-home-search-bar">
            <input type="text" placeholder="Pesquisar dúvidas..." className="app-home-search-input" />
            <button className="app-home-search-btn">Buscar</button>
          </div>
          <button onClick={() => navigate('/login')} className="app-home-btn-login">Entrar</button>
          <button onClick={() => navigate('/signup')} className="app-home-btn-signup">Cadastrar-se</button>
        </nav>
      </header>

      <div className='container-categories'>
        <div className="app-home-categories">
          <button className="app-home-category">Categoria1</button>
          <button className="app-home-category">Categoria2</button>
          <button className="app-home-category">Categoria3</button>
          <button className="app-home-category">Categoria4</button>
          <button className="app-home-category">Categoria5</button>
        </div>
      </div>

      <main id="perguntas-frequentes" className="app-home-faq">
        <h2 className="app-home-faq-title">Dúvidas Frequentes</h2>
        <div className="app-home-faq-grid">
          {[...Array(6)].map((_, i) => (
            <div className="app-home-faq-item" key={i}>
              <div className='Logo-Titulo'>
                <img src={tiraDuvidasLogo} alt="Ícone da dúvida" className="app-home-faq-img" />
                <h3 className="app-home-faq-question">Título da Pergunta</h3>
              </div>
              <p className="app-home-faq-description">
                Descrição da pergunta bem detalhada com muitos detalhes mesmo, que vai ficar ao lado da imagem padrão ou a anexada pelo usuário.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Página inicial */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cadastroduvidas" element={<CadastroDuvidas />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/minhas-duvidas" element={<MinhasDuvidas />} />
        <Route path="/responder-duvidas" element={<ResponderDuvidas />} />
        <Route path="/painel-questionador" element={<PainelQuestionador />} />
        <Route path="/painel-respondente" element={<PainelRespondente />} />
        <Route path="/duvida/:id" element={<MinhasDuvidasDetalhe />} /> {/* Detalhes de dúvida */}
      </Routes>
    </Router>
  );
}

export default AppWrapper;
