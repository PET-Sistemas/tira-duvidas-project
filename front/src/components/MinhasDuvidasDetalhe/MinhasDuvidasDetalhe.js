import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MinhasDuvidasDetalhe.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import { getAnswers }  from '../../services/answers.service.ts';
import { allAnswers } from '../../services/answers.service.ts';
import { createFeedback } from '../../services/feedback.service.ts';
import { getFeedbacks } from '../../services/feedback.service.ts';

function MinhasDuvidasDetalhe() {
  const location = useLocation();
  const doubt = location.state?.doubt;

  // Estado para armazenar avaliação e feedback
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFeedback("");
    setFeedbackType("");

    // if (doubt) {
    //   // Recupera do localStorage se já houver uma avaliação salva
    //   const savedFeedback = localStorage.getItem(`feedback_${doubt.id}`);
    //   const savedFeedbackType = localStorage.getItem(`feedbackType_${doubt.id}`);

    //   if (savedFeedback && savedFeedbackType) {
    //     setFeedback(savedFeedback);
    //     setFeedbackType(savedFeedbackType);
    //   } 
    // }

    const fetchAsnwerAndFeedback = async () => {
      try {
        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await getAnswers(doubt.id);
        const answerResp = response[response.length - 1];
        setAnswer(answerResp);

        const feedbackResp = await getFeedbacks(answerResp.id);
 
        if (feedbackResp) {
          setFeedbackType(feedbackResp.status);
          setFeedback(feedbackResp.justification);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsnwerAndFeedback();
  }, [doubt]);

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  const handleFeedbackClick = (type) => {
    setShowFeedbackInput(true);
    setFeedbackType(type);     
  };

  const handleSendFeedback = async() => {
    if (feedback.trim() === "") {
      alert("Por favor, escreva seu feedback antes de enviar.");
      return;
    }

    // Salva no localStorage para persistência
    // localStorage.setItem(`feedback_${doubt.id}`, feedback);
    // localStorage.setItem(`feedbackType_${doubt.id}`, feedbackType);

    //setShowFeedbackInput(false);

    const feedbackSend = createFeedback({
      userId: sessionStorage.getItem("id"),
      answerId: answer.id,
      justification: feedback,
      status: feedbackType,
    })

    if (!feedbackSend) {
      throw new Error('Falha ao enviar o feedback: ' + feedbackSend);
    }
    alert("Feedback enviado com sucesso!");
    setShowFeedbackInput(false);

    if(feedbackType === "unsatisfactory") {
      // Atualiza o status da questão para "não respondido" no backend
      const updateResponse = await fetch(`http://localhost:8080/api/question/${doubt.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: doubt.id, 
          title: doubt.title, 
          description: doubt.description, 
          questionerId: doubt.questionerId, 
          moderatorId: doubt.moderatorId, 
          status: 'not_answered'
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!updateResponse.ok) {
        throw new Error('Falha ao atualizar o status da dúvida: ' + updateResponse.status);
      }
    }
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
        <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString('pt-BR')}</p>
      </section>

      <section className="resposta">
        <h3>Resposta</h3>
        {doubt.status === "not_answered" ? (
          <p>Ainda não há resposta para esta dúvida.</p>
        ) : (
          <>
            <p>{answer.description}</p>
          </>
        )}
      </section>

      {doubt.status !== "not_answered" && (
        <section className="feedback">
          <h3 className="avaliacao-titulo">Avaliação</h3>

          {feedback ? (
            <div className="feedback-container">
              <p className="feedback-visualizacao"><strong>Feedback: </strong> {feedback}</p>
            </div>

            // <div className="feedback-container">
            // <button className={`btn-${feedbackType.toLowerCase()}`} disabled>
            //   {feedbackType === "Satisfatória" ? "👍 Satisfatória" : "👎 Insatisfatória"}
            // </button>
            // <p className="feedback-visualizacao"><strong>Feedback:</strong> {feedback}</p>
            // </div>
          ) : (
            <div className="avaliacao">
              <button className="btn-satisfatoria" onClick={() => handleFeedbackClick("satisfactory")}>👍 Satisfatória</button>
              <button className="btn-insatisfatoria" onClick={() => handleFeedbackClick("unsatisfactory")}>👎 Insatisfatória</button>
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