import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../services/user.service";
import arroba from "../../../utils/images/arroba.png";
import cadeado from "../../../utils/images/cadeado.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import "../Auth/Auth.css"; // Importa o CSS específico para a autenticação

function LogarContent() {
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
        const errorData = await response.json().catch(() => ({ message: "Erro ao conectar com o servidor" }));
        const mensagemErro = String(errorData.message);
        setError(mensagemErro.includes("Email") || mensagemErro.includes("Incorrect") 
          ? "Credenciais inválidas." 
          : "Erro ao fazer login.");
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

        data.user.role === "admin" ? navigate("/admin") : navigate("/");
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro durante o login");
    }
  };

 return (
    <div className="auth-right-panel-inner">
        <h2 className="auth-title">LOGIN</h2>
        <p className="auth-subtitle">Bem-vindo de volta! Faça seu login.</p>

        {error && <div className="auth-message error">{error}</div>}
        {successMessage && <div className="auth-message success">{successMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-field">
                <span className="login-input-icon">
                    <img src={arroba} alt="arroba" />
                </span>
                <input
                    className="auth-input with-icon"
                    type="email"
                    placeholder="email@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-input-field">
                <span className="login-input-icon">
                    <img src={cadeado} alt="cadeado" />
                </span>
                <input
                    className="auth-input with-icon"
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <a href="/esqueci-minha-senha" className="login-forgot-password">
                Esqueci minha senha
            </a>

            <button type="submit" className="auth-btn-submit">
                Entrar
            </button>
        </form>

        <img src={ufmsLogo} alt="UFMS Logo" className="auth-ufms-logo" />
    </div>
);
}

export default LogarContent;