import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./MinhasDuvidas.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from "../filtrar.png";

function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const navigate = useNavigate(); // Para navegação programática

  useEffect(() => {
    const mockDuvidas = [
      {
        id: 1,
        title: "Dúvida 1",
        description: "Descrição 1",
        category: "Geral",
        status: "pendente",
        date: "2024-06-27T10:00:00",
        respostas: 0,
      },
      {
        id: 2,
        title: "Dúvida 2",
        description: "Descrição 2",
        category: "Técnico",
        status: "respondida",
        date: "2024-06-26T15:30:00",
        respostas: 1,
      },
      {
        id: 3,
        title: "Dúvida 3",
        description: "Descrição 3",
        category: "Segurança",
        status: "insatisfeito",
        date: "2024-06-25T09:15:00",
        respostas: 1,
      },
    ];
    setDuvidas(mockDuvidas);
    setFilteredDoubts(mockDuvidas);
  }, []);

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
    let result = [...duvidas];

    // Filtrar por busca
    if (search) {
      result = result.filter((duvida) =>
        duvida.title.toLowerCase().includes(search.toLowerCase()) ||
        duvida.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por status
    if (filtro === "respondidas") {
      result = result.filter((duvida) => duvida.status === "respondida");
    } else if (filtro === "naoRespondidas") {
      result = result.filter((duvida) => duvida.status !== "respondida");
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
    <div className="minhas-duvidas">
      <header className="minhas-duvidas-header">
        <nav className="minhas-duvidas-nav">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
          <a href="#sobre" className="minhas-duvidas-nav-link-sobre">Sobre nós</a>
          <h2 className="titulo-pagina">Minhas Dúvidas</h2>
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
            <button onClick={aplicarFiltro} className="button-filter">Aplicar filtro</button>
          </div>
        )}
      </div>

      <section className="section-minhas-duvidas">
        <div className="doubt-list-minhas-duvidas">
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((duvida) => (
              <div className="doubt-card-container-minhas-duvidas" key={duvida.id}>
                <DoubtCard doubt={duvida} />
              </div>
            ))
          ) : (
            <p>Nenhuma dúvida encontrada.</p>
          )}
        </div>
      </section>
    </div>
  );
}

const DoubtCard = ({ doubt }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/duvida/${doubt.id}`, { state: { doubt } });
  };

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

  return (
    <div
      className={`doubt-card-minhas-duvidas ${getStatusClass(doubt.status)}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }} // Para indicar que o card é clicável
    >
      <div className="doubt-card-header-minhas-duvidas">
        <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        <div className="doubt-main-info-minhas-duvidas">
          <h3 className="doubt-title-minhas-duvidas">{doubt.title}</h3>
          <p className="doubt-description-minhas-duvidas">{doubt.description}</p>
          <p className="doubt-situation-minhas-duvidas">
            <strong>Situação:</strong> {doubt.status}
          </p>
        </div>
      </div>
      <div className="doubt-additional-info-minhas-duvidas">
        <p>
          <strong>Categoria:</strong> {doubt.category}
        </p>
        <p>
          <strong>Data:</strong> {new Date(doubt.date).toLocaleString()}
        </p>
        <p>
          <strong>Respostas:</strong> {doubt.respostas}
        </p>
      </div>
    </div>
  );
};
export default MinhasDuvidas;
