import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./MinhasDuvidas.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png";
import FilterIcon from "../../../utils/images/filtrar.png";
import logoUfms from "../../../utils/images/logo-ufms.png";

function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]); // Renomeando para filteredDoubts
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("crescente");
  const [search, setSearch] = useState(""); // Definindo a variável search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch(
          `http://localhost:8080/api/question/user/${questionerId}`
        );

        if (!response.ok) {
          throw new Error("Falha ao carregar dúvidas");
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Log dos dados recebidos

        setDuvidas(data);
        setFilteredDoubts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuvidas();
  }, []);

  useEffect(() => {
    setFilteredDoubts(duvidas); // Ajustando para duvidas
  }, [duvidas]);

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
      result = result.filter(
        (duvida) =>
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

    setFilteredDoubts(result); // Alterando para setFilteredDoubts
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="minhas-duvidas">
      <header className="header-global">
        <nav className="header-global-nav">
          <a href="/" className="app-home-logo-link">
            <img
              src={tiraDuvidasLogo}
              alt="Tira Dúvidas Logo"
              className="logo-cadasroDuvidas"
            />
          </a>

          <a href="/" className="nav-bar-item">
            <i className="bi bi-house-door-fill"></i>Início
          </a>
          <a href="sobrenos" className="nav-bar-item">
            <i className="bi bi-people-fill"></i>Sobre nós
          </a>

          <a href="/perfil" className="profile-btn">
            <img
              src={defaultProfilePic}
              alt="icon-profile"
              className="user-profile-img"
            />
          </a>
        </nav>
      </header>

      <div className="bodyminhasduvidas">
        <h2 className="titulo-pagina">Minhas Dúvidas</h2>

        <div className="filtrar-container">
          <button className="filtrar-button" onClick={toggleFiltroVisivel}>
            <img
              src={FilterIcon}
              alt="Filter Icon"
              className="filter-icon-profile"
            />
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

        <section className="section-minhas-duvidas">
          <div className="doubt-list-minhas-duvidas">
            {filteredDoubts.length > 0 ? (
              filteredDoubts.map((duvida) => (
                <div
                  className="doubt-card-container-minhas-duvidas"
                  key={duvida.id}
                >
                  <DoubtCard doubt={duvida} />
                </div>
              ))
            ) : (
              <p>Nenhuma dúvida encontrada.</p>
            )}
          </div>
        </section>
      </div>
      <footer>
        <img src={logoUfms} alt="Logo UFMS" />
      </footer>
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
    if (status === "not_answered") return "⚠️";
    if (status === "answered") return "✅";
    return "❓";
  };

  return (
    <div
      className={`doubt-card-minhas-duvidas ${getStatusClass(doubt.status)}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="doubt-card-header-minhas-duvidas">
        <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        <div className="doubt-main-info-minhas-duvidas">
          <h3 className="doubt-title-minhas-duvidas">{doubt.title}</h3>
          <p className="doubt-description-minhas-duvidas">
            {doubt.description}
          </p>
        </div>
      </div>
      <div className="doubt-additional-info-minhas-duvidas">
        <p>
          <strong>Categoria:</strong> {doubt.category}
        </p>
        <p>
          <strong>Data:</strong>{" "}
          {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}
        </p>
        <p>
          {" "}
          <strong>Status:</strong> {doubt.status}{" "}
        </p>
      </div>
    </div>
  );
};

export default MinhasDuvidas;

//<p className="doubt-situation-minhas-duvidas"><strong>Situação:</strong> {translate[doubt.status]}</p>
