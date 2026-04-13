import React, { useState, useEffect } from "react";
import "../../global.css";
import { Link } from "react-router-dom";
import { allQuestion } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";
import { useDuvidasFilter, DuvidasFilter, DoubtCard } from "../shared/DuvidasShared";

const ResponderDuvidas = () => {
  const [duvidas, setDuvidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    filtroVisivel, filtro, search, filteredDoubts,
    toggleFiltroVisivel, handleFiltroChange, handleSearchChange, aplicarFiltro,
  } = useDuvidasFilter(duvidas);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const response = await allQuestion();
        const data = await response.json();
        setDuvidas(data);
      } catch (err) {
        setError(err.message);
        alert("Erro ao carregar dúvidas: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDuvidas();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <UserLayout>
      <div className="header-div">
        <h1>Responder Dúvidas</h1>
        <p>Veja as dúvidas aguardando resposta</p>
      </div>

      <DuvidasFilter
        filtroVisivel={filtroVisivel}
        filtro={filtro}
        search={search}
        onToggle={toggleFiltroVisivel}
        onFiltroChange={handleFiltroChange}
        onSearchChange={handleSearchChange}
        onAplicar={aplicarFiltro}
      />

      <div className="doubt-list-shared">
        {filteredDoubts.filter((d) => d.status !== "answered").length > 0 ? (
          filteredDoubts
            .filter((d) => d.status !== "answered")
            .map((doubt) => (
              <DoubtCard
                key={doubt.id}
                doubt={doubt}
                showQuestioner
                actionSlot={
                  <Link
                    to={{ pathname: `/responder-duvidas/${doubt.id}` }}
                    state={{ doubt }}
                    className="btn-primary"
                    style={{ marginTop: "10px", textDecoration: "none", width: "fit-content", padding: "8px 20px", fontSize: "13px" }}
                  >
                    Responder
                  </Link>
                }
              />
            ))
        ) : (
          <p>Nenhuma dúvida encontrada.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default ResponderDuvidas;
