import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResponderDuvidasDetalhe.css";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";

function ResponderDuvidasDetalhe() {
  const location = useLocation();
  const doubt = location.state?.doubt; // A dúvida vem através do state

  // Estado para armazenar a resposta
  const [response, setResponse] = useState("");
  const [responseSent, setResponseSent] = useState(false);

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  const handleSendResponse = () => {
    if (response.trim() === "") {
      alert("Por favor, escreva uma resposta antes de enviar.");
      return;
    }

    // Simulação de envio (substituir por requisição para API)
    console.log("Resposta enviada:", response);
    setResponseSent(true);
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
    </div>
  );
}

export default ResponderDuvidasDetalhe;