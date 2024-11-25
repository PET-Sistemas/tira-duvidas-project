import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login/Logar.js';
import Signup from './components/Cadastrar/Cadastro.js';
import CadastroDuvidas from './components/CadastrarDuvidas/CadastroDuvidas.js';
import PerfilUsuario from './components/Perfil/Perfil.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      {/* Exibe os botões apenas se a rota atual não for /login, /signup, /cadastroduvidas ou /perfil */}
      {location.pathname !== '/login' && 
       location.pathname !== '/signup' && 
       location.pathname !== '/cadastroduvidas' && 
       location.pathname !== '/perfil' && (
        <div>
          <button className="btn-login" onClick={() => navigate('/login')}>
            Ir para Login
          </button>
          <button className="btn-signup" onClick={() => navigate('/signup')} style={{ marginLeft: '10px' }}>
            Ir para Cadastro
          </button>
          <button className="btn-cadastroduvidas" onClick={() => navigate('/cadastroduvidas')} style={{ marginLeft: '10px' }}>
            Ir para Cadastro de Dúvida
          </button>
          <button className="btn-perfil" onClick={() => navigate('/perfil')} style={{ marginLeft: '10px' }}>
            Ir para Perfil
          </button>
        </div>
      )}

      {/* Configura os roteamentos */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cadastroduvidas" element={<CadastroDuvidas />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
