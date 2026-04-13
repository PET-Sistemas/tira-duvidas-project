import React, { useState } from "react";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import arroba from "../../../utils/images/arroba.png";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/user.service";
import "../Login/Logar.css";
import "../Auth/Auth.css";
import "../../global.css";

function EsqueciMinhaSenha() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await forgotPassword(email);
      setSuccessMessage(
        "Se o e-mail constar em nossa base, você receberá um link com as instruções em instantes.",
      );
      setEmail("");
    } catch (err) {
      setError(
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Painel esquerdo */}
        <div className="login-left-panel">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="login-logo" />
          <p className="login-description">
            <em>
              Tire suas dúvidas relacionadas à<br />
              TIC’s com estudantes da UFMS
            </em>
          </p>
          <p className="login-footer-text">Projeto de ensino - PET-Sistemas</p>
        </div>

        <div className="login-divider"></div>

        {/* Painel direito */}
        <div className="login-right-panel">
          <div className="auth-right-panel-inner">
            <h2 className="auth-title">Redefinir Senha</h2>
            <p className="auth-subtitle">
              Informe seu e-mail para receber o link de redefinição.
            </p>

            {error && <div className="auth-message error">{error}</div>}
            {successMessage && (
              <div className="auth-message success">{successMessage}</div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-input-field">
                <span className="login-input-icon">
                  <img src={arroba} alt="arroba" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="auth-input with-icon"
                  placeholder="Insira seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px", width: "55%" }}>
                <button type="submit" className="auth-btn-submit" style={{ flex: 1 }}>
                  Enviar
                </button>
                <button
                  type="button"
                  className="auth-btn-submit"
                  style={{ flex: 1 }}
                  onClick={() => navigate("/login")}
                >
                  Cancelar
                </button>
              </div>
            </form>

            <img src={ufmsLogo} alt="UFMS Logo" className="auth-ufms-logo" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default EsqueciMinhaSenha;
