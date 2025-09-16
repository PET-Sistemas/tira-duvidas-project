import React, { useState } from "react";
import "./Cadastro.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../../services/user.service";
import { splitName } from "../../../utils/nomeSobrenome.js";

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        provider: "email",
        firstName: splitName(formData.name).firstName,
        lastName: splitName(formData.name).lastName,
        phone: formData.phone,
        role: "questioner",
        status: "active",
      });
      const data = await response.json();

      if (data.message) {
        setSuccessMessage(data.message);
        console.log(data);
        // Opcional: redirecionar após cadastro bem-sucedido
        // navigate('/login');
      } else {
        console.log(data);
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro durante o cadastro");
    }
  };

  return (
    <div className="body-cadastro">
      <div className="signup-container-cadastro">
        <div className="signup-left-panel-cadastro">
          <div className="top-content">
            <img
              src={tiraDuvidasLogo}
              alt="Tira Dúvidas Logo"
              className="signup-logo-cadastro"
            />
            <p className="description-text">
              <em>
                Tire suas dúvidas relacionadas à <br />
                TIC's com estudantes da UFMS
              </em>
            </p>
          </div>
          <p className="footer-text">Projeto de ensino - PET-Sistemas</p>
        </div>
        <div className="signup-divider-cadastro"></div>
        <div className="signup-right-panel-cadastro">
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form className="form-cadastro" onSubmit={handleSubmit}>
            <h2 className="signup-title-cadastro">Cadastrar-se</h2>
            <p className="text-form">
              *Informe os dados abaixo para ter acesso a sua nova conta.
            </p>
            <input
              type="text"
              name="name"
              placeholder="*Nome Completo"
              className="input-cadastro"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="*E-mail"
              className="input-cadastro"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="*Telefone"
              className="input-cadastro"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="*Senha"
              className="input-cadastro"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="*Confirme sua senha"
              className="input-cadastro"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button-cadastro">
              Salvar
            </button>

            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p className="register-text">
                Já possui uma conta?{" "}
                <Link to="/" className="register-link">
                  Realizar Login
                </Link>
              </p>
            </span>

            <img
              src={ufmsLogo}
              alt="UFMS Logo"
              className="signup-ufms-logo-cadastro"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
