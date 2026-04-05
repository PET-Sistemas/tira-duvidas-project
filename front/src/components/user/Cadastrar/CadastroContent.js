import React, { useState } from "react";
import { register } from "../../../services/user.service";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import "../Cadastrar/Cadastro.css"; 
import "../Auth/Auth.css";
function CadastroContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await register({
        email: formData.email,
        cpf: formData.cpf,
        password: formData.password,
        provider: "email",
        name: formData.name,
        phone: formData.phone,
        role: "questioner",
        status: "active",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Usuário cadastrado com sucesso!");
        navigate('/login');
      } else {
        throw new Error(data.message || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      if (err.message.includes("Email") || err.message.includes("CPF")) {
        setError("Email ou CPF já estão em uso.");
      } else {
        setError("Ocorreu um erro durante o cadastro");
      }
    }
  };

return (
    <div className="auth-right-panel-inner">
        <h2 className="auth-title">Cadastrar-se</h2>
        <p className="auth-subtitle">
            Informe os dados abaixo para criar a sua nova conta.
        </p>

        {error && <div className="auth-message error">{error}</div>}
        {successMessage && <div className="auth-message success">{successMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-field">
                <input
                    type="text"
                    name="name"
                    placeholder="*Nome Completo"
                    className="auth-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-input-field">
                <input
                    type="email"
                    name="email"
                    placeholder="*E-mail"
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-input-field">
                <input
                  type="text"
                  name="cpf"
                  placeholder="*CPF"
                  className="auth-input"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
            </div>

            <div className="auth-input-field">
                <input
                    type="tel"
                    name="phone"
                    placeholder="*Telefone"
                    className="auth-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-input-field">
                <input
                    type="password"
                    name="password"
                    placeholder="*Senha"
                    className="auth-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-input-field">
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="*Confirme sua senha"
                    className="auth-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="auth-btn-submit">
                Cadastrar
            </button>
        </form>

        <img src={ufmsLogo} alt="UFMS Logo" className="auth-ufms-logo" />
    </div>
);
}

export default CadastroContent;