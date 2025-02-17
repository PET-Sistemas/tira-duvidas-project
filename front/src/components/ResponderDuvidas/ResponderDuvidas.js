import React, { useState } from "react";
import "./ResponderDuvidas.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from "../filtrar.png";

const ResponderDuvidas = () => {

  const doubts = [
    {
      title: "Como funciona o cadastro?",
      description: "Gostaria de saber como criar um cadastro no sistema.",
      user: "João Silva",
      category: "Cadastro",
      status: "respondida",
      date: "2023-01-10T10:00:00",
    },
    {
      title: "Erro ao acessar minha conta",
      description: "Estou tentando acessar minha conta, mas aparece uma mensagem de erro.",
      user: "Maria Oliveira",
      category: "Conta",
      status: "pendente",
      date: "2023-01-12T15:30:00",
    },
    {
      title: "Como redefinir minha senha?",
      description: "Esqueci minha senha e não sei como redefini-la. Preciso de ajuda.",
      user: "Carlos Pereira",
      category: "Segurança",
      status: "respondida",
      date: "2023-01-11T09:15:00",
    },
    {
      title: "Aplicativo não abre",
      description: "O aplicativo fecha sozinho ao tentar abrir. O que posso fazer?",
      user: "Ana Souza",
      category: "Erro Técnico",
      status: "insatisfeito",
      date: "2023-01-09T18:45:00",
    },
    {
      title: "Qual o prazo para respostas?",
      description: "Gostaria de saber em quanto tempo as dúvidas são respondidas.",
      user: "Pedro Santos",
      category: "Informação Geral",
      status: "respondida",
      date: "2023-01-08T14:00:00",
    },
  ];

  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDoubts, setFilteredDoubts] = useState(doubts);

  const toggleFiltroVisivel = () => {
    setFiltroVisivel(!filtroVisivel);
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

    
  const aplicarFiltro = () => {
    let result = [...doubts];

    // Filtrar por busca
    if (search) {
      result = result.filter((doubt) =>
        doubt.title.toLowerCase().includes(search.toLowerCase()) ||
        doubt.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por status
    if (filtro === "respondidas") {
      result = result.filter((doubt) => doubt.status === "respondida");
    } else if (filtro === "naoRespondidas") {
      result = result.filter((doubt) => doubt.status !== "respondida");
    }

    // Ordenar por data de publicação
    if (filtro === "crescente") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date)); // Mais antigo primeiro
    } else if (filtro === "decrescente") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date)); // Mais recente primeiro
    }

    setFilteredDoubts(result);
  };
  
  return (
    
    <div className="responder-duvidas">
      <header className="responder-duvidas-header">
        <nav className="responder-duvidas-nav">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />

          <a href="#sobre" className="responder-duvidas-nav-link-sobre">Sobre nós</a>
          <h2 className="titulo-pagina">Responder Dúvidas</h2>

          <a href="/perfil" className="profile-btn">
            <img src={defaultProfilePic} alt="icon-profile" className="user-profile-img" />
          </a>
        </nav>
      </header>

      <div className="filtrar-container">
        <button className="filtrar-btn" onClick={toggleFiltroVisivel}>
          <img src={FilterIcon} alt="Filter Icon" className="filter-icon-profile" />
          Filtrar
        </button>

        {filtroVisivel && (
          <div className="filtro-container">
            <input
              type="text"
              placeholder="Buscar por palavra"
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            <select onChange={handleFiltroChange} value={filtro}>
              <option value="">Selecione um filtro</option>
              <option value="crescente">Mais antigos</option>
              <option value="decrescente">Mais recentes</option>
              <option value="respondidas">Respondidas</option>
              <option value="naoRespondidas">Não Respondidas</option>
            </select>
            <button onClick={aplicarFiltro} className="button-filter">
              Aplicar filtro
            </button>
          </div>
        )}
      </div>

      <section>
        <div className="doubt-list-responder">
          {filteredDoubts && filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt, index) => <DoubtCard key={index} doubt={doubt} />)
          ) : (
            <p>Nenhuma dúvida encontrada.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const DoubtCard = ({ doubt }) => {
  const getStatusClass = (status) => {
    if (status === "insatisfeito") return "status-insatisfeito";
    if (status === "pendente") return "status-pendente";
    if (status === "respondida") return "status-respondida";
    return "";
  };

  const getStatusIcon = (status) => {
    if (status === "insatisfeito") return "❌";
    if (status === "pendente") return "⚠️";
    if (status === "respondida") return "✅";
    return "";
  };

  const handleResponder = (id) => {
    console.log(`Responder dúvida com ID: ${id}`);
  };

  return (
    <div className={`doubt-card-responder ${getStatusClass(doubt.status)}`}>
      <div className="doubt-card-header-responder">
        {/* Ícone de status à esquerda */}
        <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        
        {/* Informações principais no centro */}
        <div className="doubt-main-info-responder">
          <h3 className="doubt-title-responder">{doubt.title}</h3> {/* Título acima */}
          <p className="doubt-description-responder">{doubt.description}</p> {/* Descrição abaixo */}
          <p className="doubt-situation-responder">
            <strong>Situação:</strong> {doubt.status}
          </p>
          <button onClick={() => handleResponder(doubt.id)} className="responder-btn"> Responder </button>        
        </div>
      </div>
      
      {/* Informações adicionais à direita */}
      <div className="doubt-additional-info-responder">
        <p>
          <strong>Usuário:</strong> {doubt.user}
        </p>
        <p>
          <strong>Categoria:</strong> {doubt.category}
        </p>
        <p>
          <strong>Data:</strong> {new Date(doubt.date).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ResponderDuvidas;
