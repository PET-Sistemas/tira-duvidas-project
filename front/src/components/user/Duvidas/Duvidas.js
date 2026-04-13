import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import { allQuestion } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";
import { useDuvidasFilter, DuvidasFilter, DoubtCard } from "../shared/DuvidasShared";

function Duvidas() {
  const navigate = useNavigate();
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
        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) throw new Error("Usuário não autenticado");

        const response = await allQuestion();
        if (response.status !== 200) throw new Error("Falha ao carregar dúvidas");

        const data = await response.json();
        setDuvidas(data);
      } catch (err) {
        setError(err.message);
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
        <h1>Todas as Dúvidas</h1>
        <p>Veja todas as dúvidas cadastradas no sistema abaixo</p>
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
        {filteredDoubts.length > 0 ? (
          filteredDoubts.map((doubt) => (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              showQuestioner
              onClick={() => navigate(`/duvida/${doubt.id}`, { state: { doubt } })}
            />
          ))
        ) : (
          <p>Nenhuma dúvida encontrada.</p>
        )}
      </div>
    </UserLayout>
  );
}

export default Duvidas;
