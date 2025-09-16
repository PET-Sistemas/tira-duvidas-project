import React, { useState } from "react";
import "./Logar.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import cadeado from "../../../utils/images/cadeado.png";
import arroba from "../../../utils/images/arroba.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../services/user.service";

function Logar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await login({ email, password });
      const data = await response.json();

      if (data.message === "Incorrect username or password") {
        setError(data.message);
      } else {
        setSuccessMessage(data.message);

        sessionStorage.setItem("id", data.user.id);
        sessionStorage.setItem("username", data.user.firstName);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro durante o login");
    }
  };

  return (
    <div className="body-login">
      <div className="container">
        <div className="left-panel">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo" />
          <p className="description-text">
            <em>
              Tire suas dúvidas relacionadas à<br />
              TIC's com estudantes da UFMS
            </em>
          </p>
          <p class="footer-text">Projeto de ensino - PET-Sistemas</p>
        </div>
        <div className="divider"></div> {/* Linha divisória */}
        <div className="right-panel">
          <h2>LOGIN</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <span className="input-icon">
                <img src={arroba} alt="arroba" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <span className="input-icon">
                <img src={cadeado} alt="cadeado" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="/esqueci-minha-senha" className="forgot-password">
              Esqueci minha senha
            </a>{" "}
            {/* Link para recuperação de senha */}
            <button type="submit" className="btn-submit">
              Entrar
            </button>
            {/* Texto "Não tem uma conta? Cadastre-se" */}
            <p className="register-text">
              Não tem uma conta?{" "}
              <Link to="/signup" className="register-link">
                Cadastre-se
              </Link>
            </p>
            <img src={ufmsLogo} alt="UFMS Logo" className="ufms-logo" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logar;
