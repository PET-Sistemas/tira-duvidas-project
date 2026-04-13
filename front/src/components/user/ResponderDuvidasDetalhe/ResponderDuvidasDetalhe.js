import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResponderDuvidasDetalhe.css";
import { createAnswers, getAnswers } from "../../../services/answers.service";
import { updateQuestionAnswered } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";

const MAX_CHARS = 1000;

function ResponderDuvidasDetalhe() {
  const location = useLocation();
  const navigate = useNavigate();
  const doubt = location.state?.doubt;

  const [response, setResponse] = useState("");
  const [responseSent, setResponseSent] = useState(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);

  useEffect(() => {
    const verifyAnswer = async () => {
      try {
        const answerResp = await getAnswers(doubt.id);
        setAnswers(answerResp);
        if (doubt.status === "answered") {
          setAlreadyAnswered(true);
        }
      } catch (err) {
        console.error("Erro ao verificar resposta:", err);
        alert("Ocorreu um erro ao verificar a resposta. Por favor, tente novamente.");
      }
    };
    verifyAnswer();
  }, [doubt.id]);

  if (!doubt) return <p>Dúvida não encontrada.</p>;

  const handleSendResponse = async () => {
    if (response.trim() === "") {
      alert("Por favor, escreva uma resposta antes de enviar.");
      return;
    }

    try {
      const responseSend = await createAnswers({
        questionId: doubt.id,
        respondentId: parseInt(sessionStorage.getItem("id")),
        respondentName: sessionStorage.getItem("username"),
        respondentEmail: sessionStorage.getItem("email"),
        description: response,
        status: "active",
      });

      if (!responseSend.ok) {
        throw new Error("Falha ao enviar a resposta: " + responseSend.status);
      }

      const updateResponse = await updateQuestionAnswered({
        id: doubt.id,
        status: "answered",
      });

      if (!updateResponse.ok) {
        throw new Error("Falha ao atualizar o status da dúvida: " + updateResponse.status);
      }

      alert("Resposta enviada com sucesso!");
      setAlreadyAnswered(true);
      navigate("/responder-duvidas");
    } catch (error) {
      alert("Ocorreu um erro ao enviar a resposta: " + error.message);
    }
  };

  const charsLeft = MAX_CHARS - response.length;
  const isNearLimit = charsLeft <= 100;

  return (
    <UserLayout>
      {/* ── Card da dúvida ── */}
      <section className="duvida-info">
        <h3>{doubt.title}</h3>

        {/* Descrição limpa, fora do azul */}
        <p className="duvida-descricao">{doubt.description}</p>

        {/* Badges de categoria e data */}
        {/* Botão toggle detalhes */}
        <button
          className={`btn-detalhes${detalhesAbertos ? " aberto" : ""}`}
          onClick={() => setDetalhesAbertos((prev) => !prev)}
        >
          Detalhes da Dúvida
          <span className="chevron">▾</span>
        </button>

        {/* Painel expansível */}
        <div className={`duvida-detalhes-painel${detalhesAbertos ? " aberto" : ""}`}>
          {doubt.categories && doubt.categories.length > 0 && (
            <p><strong>Categoria:</strong> {doubt.categories.join(", ")}</p>
          )}
          {doubt.createdAt && (
            <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}</p>
          )}
        </div>
      </section>

      {/* ── Respostas anteriores ── */}
      <section className="respostas-anteriores">
        <h3>Respostas Anteriores</h3>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className="resposta-anterior">
              <p><strong>Resposta:</strong> {answer.description}</p>
              <p><strong>Nome do Respondente:</strong> {answer.respondentName}</p>
              <p><strong>Email do Respondente:</strong> {answer.respondentEmail}</p>
              <p><strong>Data da Resposta:</strong> {new Date(answer.createdAt).toLocaleDateString("pt-BR")}</p>
            </div>
          ))
        ) : (
          <p>Esta dúvida ainda não possui respostas anteriores.</p>
        )}
      </section>

      {/* ── Área de responder ou mensagem de já respondida ── */}
      {alreadyAnswered ? (
        <section className="resposta">
          <h3>Resposta</h3>
          <p>Esta dúvida já foi respondida.</p>
        </section>
      ) : (
        <section className="responder">
          <h3>Responder</h3>
          {responseSent ? (
            <p className="resposta-enviada">Resposta enviada com sucesso!</p>
          ) : (
            <>
              <textarea
                className="resposta-input"
                placeholder="Digite sua resposta aqui..."
                value={response}
                maxLength={MAX_CHARS}
                onChange={(e) => setResponse(e.target.value)}
              />
              <div className="resposta-footer">
                <span className={`char-counter${isNearLimit ? " limite" : ""}`}>
                  {response.length}/{MAX_CHARS} caracteres
                </span>
                <button className="btn-enviar" onClick={handleSendResponse}>
                  Enviar Resposta
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </UserLayout>
  );
}

export default ResponderDuvidasDetalhe;
