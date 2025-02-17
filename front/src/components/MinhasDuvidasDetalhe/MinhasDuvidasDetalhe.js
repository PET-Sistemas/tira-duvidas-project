import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MinhasDuvidasDetalhe.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";

function MinhasDuvidasDetalhe() {
  const location = useLocation();
  const doubt = location.state?.doubt;

  // Estado para armazenar avaliação e feedback
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);

  useEffect(() => {
    if (doubt) {
      // Recupera do localStorage se já houver uma avaliação salva
      const savedFeedback = localStorage.getItem(`feedback_${doubt.id}`);
      const savedFeedbackType = localStorage.getItem(`feedbackType_${doubt.id}`);

      if (savedFeedback && savedFeedbackType) {
        setFeedback(savedFeedback);
        setFeedbackType(savedFeedbackType);
      }
    }
  }, [doubt]);

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  const handleFeedbackClick = (type) => {
    setShowFeedbackInput(true);
    setFeedbackType(type);
  };

  const handleSendFeedback = () => {
    if (feedback.trim() === "") {
      alert("Por favor, escreva seu feedback antes de enviar.");
      return;
    }

    // Salva no localStorage para persistência
    localStorage.setItem(`feedback_${doubt.id}`, feedback);
    localStorage.setItem(`feedbackType_${doubt.id}`, feedbackType);

    setShowFeedbackInput(false);
  };

  return (
    <div className="duvida-detalhada">
      <header className="duvida-detalhada-header">
        <nav className="minhas-duvidas-nav">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
          <a href="#sobre" className="minhas-duvidas-nav-link-sobre">Sobre nós</a>
          <h2 className="titulo-pagina">Minhas Dúvidas</h2>
          <a href="/perfil" className="profile-btn">
            <img src={defaultProfilePic} alt="icon-profile" className="user-profile-img" />
          </a>
        </nav>
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
          </>
        )}
      </section>

      {doubt.status !== "pendente" && (
        <section className="feedback">
          <h3>Avaliação</h3>

          {feedback ? (
            <div className="feedback-container">
              <button className={`btn-${feedbackType.toLowerCase()}`} disabled>
                {feedbackType === "Satisfatória" ? "👍 Satisfatória" : "👎 Insatisfatória"}
              </button>
              <p className="feedback-visualizacao"><strong>Feedback:</strong> {feedback}</p>
            </div>
          ) : (
            <div className="avaliacao">
              <button className="btn-satisfatoria" onClick={() => handleFeedbackClick("Satisfatória")}>👍 Satisfatória</button>
              <button className="btn-insatisfatoria" onClick={() => handleFeedbackClick("Insatisfatória")}>👎 Insatisfatória</button>
            </div>
          )}

          {showFeedbackInput && (
            <div className="feedback-container">
              <textarea
                className="feedback-input"
                placeholder={`Explique por que a resposta foi ${feedbackType.toLowerCase()}...`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button className="btn-enviar-feedback" onClick={handleSendFeedback}>Enviar Feedback</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default MinhasDuvidasDetalhe;
