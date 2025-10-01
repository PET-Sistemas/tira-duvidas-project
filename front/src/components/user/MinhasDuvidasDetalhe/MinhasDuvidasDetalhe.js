import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MinhasDuvidasDetalhe.css";
import { getAnswers } from "../../../services/answers.service";
import { createFeedback } from "../../../services/feedback.service";
import { updateQuestionAnswered } from "../../../services/question.service";
import { getFeedbacks } from "../../../services/feedback.service";
import UserLayout from "../Layout/UserLayout";

function MinhasDuvidasDetalhe() {
  const location = useLocation();
  const doubt = location.state?.doubt;

  // Estado para armazenar avaliação e feedback
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [answers, setAnswers] = useState([]);
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

        const answersResp = await getAnswers(doubt.id);
        setAnswers(answersResp);

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

  const handleSendFeedback = async () => {
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
    });

    if (!feedbackSend) {
      throw new Error("Falha ao enviar o feedback: " + feedbackSend);
    }
    alert("Feedback enviado com sucesso!");
    setShowFeedbackInput(false);

    if (feedbackType === "unsatisfactory") {
        const updateResponse = await updateQuestionAnswered({
        id: doubt.id,
        title: doubt.title,
        description: doubt.description,
        questionerId: doubt.questionerId,
        status: "not_answered",
        categories: doubt.categories
      })

      if (!updateResponse.ok) {
        throw new Error(
          "Falha ao atualizar o status da dúvida: " + updateResponse.status
        );
      }
    }
  };

  return (
    <UserLayout>
      <section className="duvida-info">
        <h3>{doubt.title}</h3>
        <h4>{doubt.description}</h4>

        <br></br>
        
        <p>
          <strong>Id:</strong> {doubt.id}
        </p>
        <p>
          <strong>Questionador:</strong> {doubt.questioner.name}
        </p>
        <p>
          <strong>Email do Questionador:</strong> {doubt.questioner.email}
        </p>
        <p>
          <strong>Categoria:</strong> {doubt.categories[0].name}
        </p>
        <p>
          <strong>Data:</strong>{" "}
          {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </section>

      {answers.length > 0 ? (
        <section className="respostas-anteriores">
          <h3>Respostas Anteriores</h3>
          {answers.map((answer) => (
            <div key={answer.id} className="resposta-anterior">
              <p>
                <strong>Resposta:</strong> {answer.description}
              </p>
              <p>
                <strong>Nome do Respondente:</strong> { answer.respondentName }
              </p>
              <p>
                <strong>Email do Respondente:</strong> { answer.respondentEmail }
              </p>
              <p>
                <strong>Data da Resposta:</strong>{" "}
                {new Date(answer.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </section>
      ) : (
        <section className="respostas-anteriores">
          <h3>Respostas Anteriores</h3>
          <p>Esta dúvida ainda não possui respostas anteriores.</p>
        </section>
      )}

      <section className="resposta">
        <h3>Resposta Atual</h3>
        {doubt.status === "not_answered" ? (
          <p>Ainda não há resposta atual para esta dúvida.</p>
        ) : (
          <>
            <p>
              <strong> {answer.description} </strong>
            </p>
            <br></br>
            <p>
              <strong>Respondente:</strong> {answer.respondentName}
            </p>
            <p>
              <strong>Email do Respondente:</strong> {answer.respondentEmail}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(answer.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </>
        )}
      </section>

      {doubt.status === "answered" && doubt.questioner.id == sessionStorage.getItem("id") && (
        <section className="feedback">
          <h3 className="avaliacao-titulo">Avaliação</h3>

          {feedback ? (
            <div className="feedback-container">
              <p className="feedback-visualizacao">
                <strong>Feedback: </strong> {feedback}
              </p>
            </div>
          ) : (
            // <div className="feedback-container">
            // <button className={`btn-${feedbackType.toLowerCase()}`} disabled>
            //   {feedbackType === "Satisfatória" ? "👍 Satisfatória" : "👎 Insatisfatória"}
            // </button>
            // <p className="feedback-visualizacao"><strong>Feedback:</strong> {feedback}</p>
            // </div>
            <div className="avaliacao">
              <button
                className="btn-satisfatoria"
                onClick={() => handleFeedbackClick("satisfactory")}
              >
                👍 Satisfatória
              </button>
              <button
                className="btn-insatisfatoria"
                onClick={() => handleFeedbackClick("unsatisfactory")}
              >
                👎 Insatisfatória
              </button>
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
              <button
                className="btn-enviar-feedback"
                onClick={handleSendFeedback}
              >
                Enviar Feedback
              </button>
            </div>
          )}
        </section>
      )}
    </UserLayout>
  );
}

export default MinhasDuvidasDetalhe;
