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

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Erro ao conectar com o servidor" }));

        const mensagemErro = String(errorData.message);

        if (
          mensagemErro.includes("Email") ||
          mensagemErro.includes("Incorrect")
        ) {
          setError("Credenciais inválidas.");
        } else {
          setError("Erro ao fazer login.");
        }

        return;
      }

      const data = await response.json();
      if (!data.token || !data.user) {
        setError(data.message || "Credenciais inválidas.");
      } else {
        setSuccessMessage(data.message);

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("id", data.user.id);
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("username", data.user.name);
        sessionStorage.setItem("telefone", data.user.phone);
        sessionStorage.setItem("role", data.user.role);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Ocorreu um erro durante o login");
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
              Tire suas dúvidas relacionadas à UFMS<br />
              com estudantes!
            </em>
          </p>
          <p className="login-footer-text">Projeto de ensino - PET-Sistemas</p>
        </div>

        {/* Divisor */}
        <div className="login-divider"></div>

        {/* Painel direito */}
        <div className="login-right-panel">
          <h2 className="login-title">LOGIN</h2>

          {error && <div className="login-error">{error}</div>}
          {successMessage && <div className="login-success">{successMessage}</div>}

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="login-input-field">
              <span className="login-input-icon">
                <img src={arroba} alt="arroba" />
              </span>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-field">
              <span className="login-input-icon">
                <img src={cadeado} alt="cadeado" />
              </span>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="/esqueci-minha-senha" className="login-forgot-password">
              Esqueci minha senha
            </a>

            <button type="submit" className="login-btn-submit">
              Entrar
            </button>

            <p className="login-register-text">
              Não tem uma conta?{" "}
              <Link to="/signup" className="login-register-link">
                Cadastre-se
              </Link>
            </p>

            <img src={ufmsLogo} alt="UFMS Logo" className="login-ufms-logo" />
          </form>
        </div>

      </div>
    </div>
  );
}

export default Logar;
