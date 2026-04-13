import React, { useState } from "react";
import "./EsqueciMinhaSenha.css"; // Reaproveitando o seu CSS
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../services/user.service";

function RedefinirSenha() {
  const navigate = useNavigate();
  // Hook para pegar os parâmetros da URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extrai o token do link do e-mail

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // 1. Validação do Token
    if (!token) {
      setError(
        "Link inválido ou ausente. Por favor, solicite a recuperação novamente.",
      );
      return;
    }

    // 2. Validação das senhas no frontend
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // 3. Chama o backend
      await resetPassword(token, password);

      setSuccessMessage("Senha alterada com sucesso! Redirecionando...");

      // Limpa os campos e redireciona para o login após 3 segundos
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err);
      const mensagemErro =
        err.response?.data?.errors?.token || err.response?.data?.message;

      if (
        mensagemErro?.includes("inválido") ||
        mensagemErro?.includes("expirado")
      ) {
        setError("Este link já expirou ou é inválido. Solicite um novo.");
      } else {
        setError("Ocorreu um erro ao redefinir a senha. Tente novamente.");
      }
    }
  };

  return (
    <div className="body-esqueci-minha-senha">
      <div className="container-esqueci-minha-senha">
        <div className="left-panel-esqueci-minha-senha">
          <img
            src={tiraDuvidasLogo}
            alt="Tira Dúvidas Logo"
            className="logo-esqueci-minha-senha"
          />
          <p className="description-text-esqueci-minha-senha">
            <em>
              Tire suas dúvidas relacionadas à<br />
              TIC's com estudantes da UFMS
            </em>
          </p>
          <p className="footer-text-esqueci-minha-senha">
            Projeto de ensino - PET-Sistemas
          </p>
        </div>
        <div className="divider-esqueci-minha-senha"></div>

        <div className="right-panel-esqueci-minha-senha">
          <h2>Criar Nova Senha</h2>
          {error && (
            <div className="error-message-esqueci-minha-senha">{error}</div>
          )}
          {successMessage && (
            <div className="success-message-esqueci-minha-senha">
              {successMessage}
            </div>
          )}

          <form className="form-esqueci-minha-senha" onSubmit={handleSubmit}>
            <div className="input-field-esqueci-minha-senha">
              <input
                type="password"
                className="input-esqueci-minha-senha"
                placeholder="Nova senha (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: "15px" }} // Ajuste rápido pois removemos o ícone do arroba
              />
            </div>

            <div
              className="input-field-esqueci-minha-senha"
              style={{ marginTop: "15px" }}
            >
              <input
                type="password"
                className="input-esqueci-minha-senha"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ paddingLeft: "15px" }}
              />
            </div>

            <div
              className="button-group-esqueci-minha-senha"
              style={{ marginTop: "25px" }}
            >
              <button className="button-esqueci-minha-senha" type="submit">
                Salvar Senha
              </button>
              <button
                type="button"
                className="button-esqueci-minha-senha"
                onClick={() => navigate("/login")}
              >
                Voltar
              </button>
            </div>
          </form>
          <img
            src={ufmsLogo}
            alt="UFMS Logo"
            className="ufms-logo-esqueci-minha-senha"
          />
        </div>
      </div>
    </div>
  );
}

export default RedefinirSenha;
