import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResponderDuvidasDetalhe.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import { createAnswers } from '../../services/answers.service.ts';
import { getAnswers }  from '../../services/answers.service.ts';


function ResponderDuvidasDetalhe() {
  const location = useLocation();
  const doubt = location.state?.doubt; // A dúvida vem através do state

  // Estado para armazenar a resposta
  const [response, setResponse] = useState("");
  const [responseSent, setResponseSent] = useState(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  const verifyAnswer = async () => {
    try {
      const answerResp = await getAnswers(doubt.id);

      if (answerResp) {
        setAlreadyAnswered(true);
      }
    } catch (err) {
      console.error("Erro ao verificar resposta:", err);
      alert("Ocorreu um erro ao verificar a resposta. Por favor, tente novamente.");
    }
  };

  verifyAnswer();
  
  const handleSendResponse = async () => {
    if (response.trim() === "") {
      alert("Por favor, escreva uma resposta antes de enviar.");
      return;
    }

    try {
      // Salva a resposta no backend
      const responseSend = await createAnswers({
        questionId: doubt.id,
        respondentId: sessionStorage.getItem("id"),
        auditorId: doubt.moderatorId,
        description: response,
        status: "active"
      })

      if(!responseSend.ok) {
        throw new Error('Falha ao enviar a resposta: ' + responseSend.status);
      }

      // Atualiza o status da questão para "respondido" no backend
      const updateResponse = await fetch(`http://localhost:8080/api/question/${doubt.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: doubt.id, 
          title: doubt.title, 
          description: doubt.description, 
          questionerId: doubt.questionerId, 
          moderatorId: doubt.moderatorId, 
          status: 'answered'
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!updateResponse.ok) {
        throw new Error('Falha ao atualizar o status da dúvida: ' + updateResponse.status);
      }

      alert("Resposta enviada com sucesso!");
      setResponseSent(true);
      console.log("Resposta enviada: ", responseSend.json());
    } catch (error) {
      console.error("Erro ao atualizar a dúvida:", error);
      alert("Ocorreu um erro ao enviar a resposta. Por favor, tente novamente.");
    }
  };

  return (
    <div className="responder-duvidas">
      <header className="responder-duvida-header">
        <nav className="responder-duvidas-nav">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
          <a href="#sobre" className="responder-duvidas-nav-link-sobre">Sobre nós</a>
          <h2 className="titulo-pagina">Responder Dúvidas</h2>
          <a href="/perfil" className="profile-btn">
            <img src={defaultProfilePic} alt="icon-profile" className="user-profile-img" />
          </a>
        </nav>
      </header>

      <section className="duvida-info">
        <h3>{doubt.title}</h3>
        <p>{doubt.description}</p>
        <div className="duvida-info-footer">
          <p><strong>Categoria:</strong> {doubt.category}</p>
          <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}</p>
        </div>
      </section>

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
          <div className="resposta">
            <textarea
              className="resposta-input"
              placeholder="Digite sua resposta aqui..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>
        )}
        <button className="btn-enviar" onClick={handleSendResponse}>
          Enviar Resposta
        </button>
        </section>
      )}
    </div>
  );
}

export default ResponderDuvidasDetalhe;