import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

/**
 * Componente reutilizável para botão de voltar
 * @param {string} label - Texto do botão (padrão: "Voltar")
 * @param {function} onBack - Função customizada ao clicar (opcional, usa navigate(-1) por padrão)
 */
function BackButton({ label = "Voltar", onBack = null }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="back-button-container">
      <button className="back-button" onClick={handleBack} title={label}>
        <i className="bi bi-arrow-left"></i>
        <span>{label}</span>
      </button>
    </div>
  );
}

export default BackButton;
