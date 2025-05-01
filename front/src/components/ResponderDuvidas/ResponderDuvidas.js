import React, { useState, useEffect } from "react";
import "./ResponderDuvidas.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from "../filtrar.png";
import { Link } from "react-router-dom"; // Importando Link do React Router 

const ResponderDuvidas = () => {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/question/");
        if (!response.ok) {
          throw new Error("Falha ao carregar dúvidas");
        }
        const data = await response.json();
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

    if (search) {
      result = result.filter(
        (duvida) =>
          duvida.title.toLowerCase().includes(search.toLowerCase()) ||
          duvida.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filtro === "crescente") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filtro === "decrescente") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filtro === "naoRespondidas") {
      result = result.filter((doubt) => doubt.status === "naoRespondidas");
    } else if (filtro === "respondidas") {
      result = result.filter((doubt) => doubt.status === "respondidas");
    }

    setFilteredDoubts(result);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

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
            <input type="text" placeholder="Buscar por palavra" value={search} onChange={handleSearchChange} className="search-input" />
            <select onChange={handleFiltroChange} value={filtro}>
              <option value="">Selecione um filtro</option>
              <option value="crescente">Mais antigos</option>
              <option value="decrescente">Mais recentes</option>
              <option value="naoRespondidas">Não Respondidas</option>
              <option value="respondidas">Respondidas</option>
            </select>
            <button onClick={aplicarFiltro} className="button-filter">Aplicar filtro</button>
          </div>
        )}
      </div>

      <section>
        <div className="doubt-list-responder">
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt) => <DoubtCard key={doubt.id} doubt={doubt} />)
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
    if (status === "active") return "✅";
    return "";
  };

  const handleResponder = (id) => {
    console.log('Responder dúvida com ID: ${id}');
  };

  return (
    <div className={`doubt-card-responder ${getStatusClass(doubt.status)}`}>
      <div className="doubt-card-header-responder">
        <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        <div className="doubt-main-info-responder">
          <h3 className="doubt-title-responder">{doubt.title}</h3>
          <p className="doubt-description-responder">{doubt.description}</p>
          <p className="doubt-situation-responder">
            <strong>Status:</strong> {doubt.status}
          </p>
          {doubt.status !== "respondida" && ( <Link to={{ pathname: `/responder-duvidas/${doubt.id}` }}
          state={{ doubt }} className="responder-btn"> Responder </Link> )}
        </div>
      </div>
      <div className="doubt-additional-info-responder">
        <p><strong>Usuário:</strong> {doubt.questionerId}</p>
        <p><strong>Categoria:</strong> {doubt.category}</p>
        <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ResponderDuvidas;