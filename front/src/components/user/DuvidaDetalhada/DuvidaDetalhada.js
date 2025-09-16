import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DuvidaDetalhada.css";

function DuvidaDetalhada() {
  const location = useLocation();
  const navigate = useNavigate();
  const doubt = location.state?.doubt;

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  return (
    <div className="duvida-detalhada">
      <header>
        <button onClick={() => navigate(-1)}>Voltar</button>
        <h2>Minha Dúvida</h2>
      </header>

      <section className="duvida-info">
        <h3>{doubt.title}</h3>
        <p>{doubt.description}</p>
        <p><strong>Categoria:</strong> {doubt.category}</p>
        <p><strong>Data:</strong> {new Date(doubt.date).toLocaleString()}</p>
      </section>

      <section className="resposta">
        <h3>Resposta</h3>
        {doubt.status === "pendente" ? (
          <p>Ainda não há resposta para esta dúvida.</p>
        ) : (
          <>
            <p>Esta é a resposta para a dúvida...</p>
            <div className="avaliacao">
              <button className="btn-satisfatoria">👍 Satisfatória</button>
              <button className="btn-insatisfatoria">👎 Insatisfatória</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default DuvidaDetalhada;
