import React, { useState, useEffect } from "react";
import "./MinhasDuvidas.css";
import naoAvaliadoIcon from "../NaoAvaliado.png";
import bemAvaliadoIcon from "../BemAvaliado.png";
import malAvaliadoIcon from "../MalAvaliado.png";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from "../filtrar.png";

function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]); // Renomeando para filteredDoubts
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("crescente");
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

  const getIcon = (situacao) => {
    switch (situacao) {
      case "Não Avaliado":
        return naoAvaliadoIcon;
      case "Satisfatório":
        return bemAvaliadoIcon;
      case "Insatisfatório":
        return malAvaliadoIcon;
      default:
        return naoAvaliadoIcon;
    }
  };

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
    let novasDuvidas = [...duvidas];

    if (filtro === "crescente") {
      novasDuvidas.sort((a, b) => a.respostas - b.respostas);
    } else if (filtro === "decrescente") {
      novasDuvidas.sort((a, b) => b.respostas - a.respostas);
    } else if (filtro === "bemAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Satisfatório"
      );
    } else if (filtro === "malAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Insatisfatório"
      );
    } else if (filtro === "naoAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Não Avaliado"
      );
    }

    setDuvidasFiltradas(novasDuvidas);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="minhas-duvidas">
      <header className="minhas-duvidas-header">
        <img
          src={tiraDuvidasLogo}
          alt="Tira Dúvidas Logo"
          className="logo-cadasroDuvidas"
        />
        <nav className="minhas-duvidas-nav">
          <a href="#sobre" className="minhas-duvidas-nav-link-sobre">
            Sobre nós
          </a>
          <a
            href="#perguntas-frequentes"
            className="minhas-duvidas-nav-link-perguntas"
          >
            Perguntas Frequentes
          </a>
          <div className="minhas-duvidas-search-bar">
            <input
              type="text"
              placeholder="Pesquisar dúvidas..."
              className="minhas-duvidas-search-input"
            />
            <button className="minhas-duvidas-search-btn">Buscar</button>
          </div>
          <a href="/perfil" className="profile-btn">
            <img
              src={defaultProfilePic}
              alt="icon-profile"
              className="user-profile-img"
            />
          </a>
        </nav>
      </header>

      <h2 className="titulo-pagina">Minhas Dúvidas</h2>

      <div className='filtrar-container'>
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

      {duvidasFiltradas.length === 0 ? (
        <div className="sem-duvidas">Nenhuma dúvida encontrada</div>
      ) : (
        duvidasFiltradas.map((duvida) => (
          <div key={duvida.id} className="card-duvida">
            <div className="icon-container">
              <img
                src={getIcon(duvida.status)}
                alt="Situação"
                className="icon-situacao"
              />
            </div>
            <div className="content">
              <h3 className="titulo-duvida">{duvida.title}</h3>
              <p className="descricao-duvida">{duvida.description}</p>
            </div>
            <div className="info-duvida">
              <p>
                <strong>
                  {new Date(duvida.createdAt).toLocaleDateString("pt-BR")}
                </strong>
              </p>
              <p>
                <strong>{duvida.status}</strong>
              </p>
              <p>
                <strong>{1} resposta(s)</strong>
              </p>
            </div>
          </div>
        ))
      )}
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
    return "❓";
  };

  return (
    <div className={`doubt-card-minhas-duvidas ${getStatusClass(doubt.status)}`} onClick={handleClick}
    style={{ cursor: "pointer" }}>
      <div className="doubt-card-header-minhas-duvidas">
      <span className="status-icon">{getStatusIcon(doubt.status)}</span>
        <div className="doubt-main-info-minhas-duvidas">
          <h3 className="doubt-title-minhas-duvidas">{doubt.title}</h3>
          <p className="doubt-description-minhas-duvidas">{doubt.description}</p>
          <p className="doubt-situation-minhas-duvidas"><strong>Situação:</strong> {doubt.status}</p>
        </div>
      </div>
      <div className="doubt-additional-info-minhas-duvidas">
        <p><strong>Categoria:</strong> {doubt.category}</p>
        <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString('pt-BR')}</p>
        <p> <strong>Respostas:</strong> {doubt.respostas} </p>
      </div>
    </div>
  );
};

export default MinhasDuvidas;
