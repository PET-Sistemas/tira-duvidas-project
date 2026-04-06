import React, { useState, useEffect } from "react";
import "./Duvidas.css";
import "../global.css";
import FilterIcon from "../../../utils/images/filtrar.png";
import { allQuestion } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";

function Duvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("crescente");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const data = await allQuestion(); // Dados já retornados diretamente
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
    setFilteredDoubts(duvidas);
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

    if (search) {
      result = result.filter(
        (duvida) =>
          duvida.title.toLowerCase().includes(search.toLowerCase()) ||
          duvida.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filtro === "respondidas") {
      result = result.filter((duvida) => duvida.status === "respondida");
    } else if (filtro === "naoRespondidas") {
      result = result.filter((duvida) => duvida.status !== "respondida");
    }

    if (filtro === "crescente") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filtro === "decrescente") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredDoubts(result);
    console.log("Dúvidas filtradas:", result); // Log para verificar os dados antes da renderização
  };

  if (loading) {
    console.log("Carregando...");
    return <div>Carregando...</div>;
  }

  if (error) {
    console.error("Erro ao carregar dúvidas:", error);
    return <div>{error}</div>;
  }

  return (
    <UserLayout>
      <h2 className="titulo-pagina">Todas as Dúvidas</h2>

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
                className="doubt-card-container-todas-duvidas"
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
    </UserLayout>
  );
}

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
    return "❓";
  };

  const getStatus = (status) => {
    if (status === "not_answered") return "Não Respondida";
    if (status === "answered") return "Respondida";
    return "Pendente";
  };

  return (
    <div
      className={`doubt-card-minhas-duvidas ${getStatusClass(doubt.status)}`}
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
          <strong>Categoria:</strong> {doubt.categories?.[0]?.name || "Sem categoria"}
        </p>
        <p>
          <strong>Data:</strong>{" "}
          {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}
        </p>
        <p>
          {" "}
          <strong>Status:</strong> {getStatus(doubt.status)}{" "}
        </p>
        <p>
          {" "}
          <strong>Usuário:</strong> {doubt.questioner.name}{" "}
        </p>
      </div>
    </div>
  );
};

export default Duvidas;
