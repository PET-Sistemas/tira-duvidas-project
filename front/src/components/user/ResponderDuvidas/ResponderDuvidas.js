import React, { useState, useEffect } from "react";
import "./ResponderDuvidas.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png";
import FilterIcon from "../../../utils/images/filtrar.png";
import { Link } from "react-router-dom"; // Importando Link do React Router
import logoUfms from "../../../utils/images/logo-ufms.png";
import { allQuestion } from "../../../services/question.service";
import { all } from "axios";
import UserLayout from "../Layout/UserLayout";

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
        const response = await allQuestion();
        if (response.status !== 200) {
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
    <UserLayout>
      <h2 className="titulo-pagina">Responder Dúvidas</h2>

      <div className="filtrar-container">
        <button className="filtrar-btn" onClick={toggleFiltroVisivel}>
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
              <option value="naoRespondidas">Não Respondidas</option>
              <option value="respondidas">Respondidas</option>
            </select>
            <button onClick={aplicarFiltro} className="button-filter">
              Aplicar filtro
            </button>
          </div>
        )}
      </div>

      <section>
        <div className="doubt-list-responder">
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt) => (
              <DoubtCard key={doubt.id} doubt={doubt} />
            ))
          ) : (
            <p>Nenhuma dúvida encontrada.</p>
          )}
        </div>
      </section>
   </UserLayout>
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
    if (status === "not_answered") return "⚠️";
    if (status === "answered") return "✅";
    return "";
  };

  const getStatus = (status) => {
    if (status === "not_answered") return "Não Respondida";
    if (status === "answered") return "Respondida";
    return "Pendente";
  }

  const handleResponder = (id) => {
    console.log("Responder dúvida com ID: ${id}");
  };

  if(doubt.status === "answered"){
    return;
  }else{
    return (
        <div className={`doubt-card-responder ${getStatusClass(doubt.status)}`}>
            <div className="doubt-card-header-responder">
            <span className="status-icon">{getStatusIcon(doubt.status)}</span>
            <div className="doubt-main-info-responder">
              <h3 className="doubt-title-responder">{doubt.title}</h3>
              <p className="doubt-description-responder">{doubt.description}</p>
              <p className="doubt-situation-responder"></p>
              {doubt.status !== "respondida" && (
                <Link
                  to={{ pathname: `/responder-duvidas/${doubt.id}` }}
                  state={{ doubt }}
                  className="responder-btn"
                >
                  {" "}
                  Responder{" "}
                </Link>
              )}
            </div>
          </div>
          <div className="doubt-additional-info-responder">
            <p>
              <strong>Usuário:</strong> {doubt.questioner.name}
            </p>
            <p>
              <strong>Categoria:</strong> {doubt.categories[0].name}
            </p>
            <p>
              <strong>Data:</strong> {new Date(doubt.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {getStatus(doubt.status)}
            </p>
          </div>
        </div>
    );
  }
};

export default ResponderDuvidas;
