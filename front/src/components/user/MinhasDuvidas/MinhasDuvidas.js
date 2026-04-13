import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./MinhasDuvidas.css";
import "../../global.css";
import FilterIcon from "../../../utils/images/filtrar.png";
import { getQuestionByUserId } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";

function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]); // Renomeando para filteredDoubts
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState(""); // Definindo a variável search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filtroRef = useRef(null);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await getQuestionByUserId(questionerId);

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

  useEffect(() => {
    setFilteredDoubts(duvidas); // Ajustando para duvidas
  }, [duvidas]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filtroVisivel &&
        filtroRef.current &&
        !filtroRef.current.contains(event.target)
      ) {
        setFiltroVisivel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filtroVisivel]);

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
          duvida.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filtrar por status
    if (filtro === "respondidas") {
      result = result.filter((duvida) => duvida.status === "answered");
    } else if (filtro === "naoRespondidas") {
      result = result.filter((duvida) => duvida.status !== "answered");
    }

    // Ordenar por data de publicação
    if (filtro === "crescente") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Mais antigo primeiro
    } else if (filtro === "decrescente") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Mais recente primeiro
    }

    setFilteredDoubts(result); // Alterando para setFilteredDoubts
    setFiltroVisivel(false);
  };

  const limparFiltro = () => {
    setSearch("");
    setFiltro("");
    setFilteredDoubts(duvidas);
    setFiltroVisivel(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserLayout>
      <div className="header-div">
        <h1>Minhas Dúvidas</h1>
        <p>Acompanhe o status das suas dúvidas e veja as respostas</p>
      </div>

      <div className="bodyminhasduvidas">
        <div className="tamanho">
          <div className="filtrar-container" ref={filtroRef}>
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
                  <option value="" disabled>
                    Selecione um filtro
                  </option>
                  <option value="crescente">Mais antigos</option>
                  <option value="decrescente">Mais recentes</option>
                  <option value="respondidas">Respondidas</option>
                  <option value="naoRespondidas">Não Respondidas</option>
                </select>
                <button onClick={aplicarFiltro} className="button-filter">
                  Aplicar filtro
                </button>
                <button onClick={limparFiltro} className="button-clear">
                  Limpar filtros
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
      </div>
    </UserLayout>
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

  const getStatus = (status) => {
    if (status === "not_answered") return "Não Respondida";
    if (status === "answered") return "Respondida";
    return "Pendente";
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
          <strong>Categoria:</strong> {doubt.categories[0].name}
        </p>
        <p>
          <strong>Data:</strong>{" "}
          {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}
        </p>
        <p>
          {" "}
          <strong>Status:</strong> {getStatus(doubt.status)}{" "}
        </p>
      </div>
    </div>
  );
};

export default MinhasDuvidas;

//<p className="doubt-situation-minhas-duvidas"><strong>Situação:</strong> {translate[doubt.status]}</p>
