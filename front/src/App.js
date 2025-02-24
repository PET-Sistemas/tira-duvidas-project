import React, { useEffect, useState } from 'react';
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
import { allQuestion, getQuestionByTitle } from './services/question.service.ts';
import { allCategory } from './services/category.service.ts';
import MinhasDuvidasDetalhe from './components/MinhasDuvidasDetalhe/MinhasDuvidasDetalhe.js';
import ResponderDuvidasDetalhe from './components/ResponderDuvidasDetalhe/ResponderDuvidasDetalhe.js';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]); // Estado para armazenar as perguntas
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para armazenar a categoria selecionada

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Chama a API para buscar todas as categorias e perguntas
    const fetchData = async () => {
      try {
        const fetchedCategories = await allCategory(); // Faz a requisição para obter todas as categorias
        const fetchedQuestions = await allQuestion(); // Faz a requisição para obter todas as perguntas
        setCategories(fetchedCategories); // Atualiza o estado das categorias
        setQuestions(fetchedQuestions); // Atualiza o estado das perguntas
      } catch (error) {
        console.error('Erro ao buscar categorias ou perguntas:', error);
      }
    };

    fetchData(); // Chama a função fetchData
  }, []);

  // Função para filtrar as perguntas pela categoria
  const filterQuestionsByCategory = async (categoryName) => {
    setSelectedCategory(categoryName); // Atualiza a categoria selecionada
    try {
      // Chama a API para buscar perguntas que correspondem ao título da categoria
      const filteredQuestions = await getQuestionByTitle(categoryName); 
      setQuestions(filteredQuestions); // Atualiza o estado das perguntas filtradas
    } catch (error) {
      console.error('Erro ao filtrar perguntas:', error);
    }
  };

  const handleLogout = () => {
    // Remove o username do sessionStorage e redefine o estado
    sessionStorage.removeItem('username');
    setUsername('');
    navigate('/');
  };

  return (
    <div className="app-home">
      <header className="app-home-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <nav className="app-home-nav">
          <a href="#" onClick={()=> navigate("/cadastroduvidas")} className="app-home-nav-link">Cadastrar dúvida</a>
          <a href="#sobre" className="app-home-nav-link">Sobre nós</a>
          <a href="#perguntas-frequentes" className="app-home-nav-link">Perguntas Frequentes</a>
          <div className="app-home-search-bar">
            <input type="text" placeholder="Pesquisar dúvidas..." className="app-home-search-input" />
            <button className="app-home-search-btn">Buscar</button>
          </div>
          
          {username ? (
            // Exibe o nome do usuário se estiver logado
            <div className="app-home-user-info">
              <span className="app-home-username">Olá, {username}!</span>
              <button onClick={handleLogout} className="app-home-btn-logout">Sair</button>
            </div>
          ) : (
            // Exibe os botões de login e cadastro se o usuário não estiver logado
            <>
              <button onClick={() => navigate('/login')} className="app-home-btn-login">Entrar</button>
              <button onClick={() => navigate('/signup')} className="app-home-btn-signup">Cadastrar-se</button>
            </>
          )}
        </nav>
      </header>

      <div className="container-categories">
        <div className="app-home-categories">
          {/* Renderiza as categorias dinamicamente */}
          {categories.map((category) => (
            <button
              className={`app-home-category ${selectedCategory === category.name ? 'selected' : ''}`}
              key={category.id}
              onClick={() => filterQuestionsByCategory(category.name)} // Passa o nome da categoria ao clicar
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <main id="perguntas-frequentes" className="app-home-faq">
        <h2 className="app-home-faq-title">Dúvidas Frequentes</h2>
        <div className="app-home-faq-grid">
          {/* Renderiza as perguntas dinamicamente */}
          {questions.map((question) => (
            <div className="app-home-faq-item" key={question.id}>
              <div className='Logo-Titulo'>
                <img src={tiraDuvidasLogo} alt="Ícone da dúvida" className="app-home-faq-img" />
                <h3 className="app-home-faq-question">{question.title}</h3>
              </div>
              <p className="app-home-faq-description">
                {question.description}
              </p>
              <button>Responder</button>
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
        <Route path="/responder-duvidas-detalhe" element={<ResponderDuvidasDetalhe />} />

      </Routes>
    </Router>
  );
}

export default AppWrapper;
