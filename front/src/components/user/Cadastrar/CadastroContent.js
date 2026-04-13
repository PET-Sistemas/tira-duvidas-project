import React, { useState } from "react";
import { register } from "../../../services/user.service";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import "../Cadastrar/Cadastro.css";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";

// Função para mascarar o CPF: 000.000.000-00
const maskCPF = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// Função para mascarar o Telefone: (00) 00000-0000 ou (00) 0000-0000
const maskPhone = (value) => {
  let v = value.replace(/\D/g, "");
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  } else {
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }
  return v.substring(0, 15);
};

function CadastroContent({ onSuccess }) {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = maskCPF(value);
    }
    
    if (name === "phone") {
      value = maskPhone(value);
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // 1. Validação de E-mail (Verifica se tem o formato de email válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // 2. Validação de CPF (Verifica se está completo no formato 000.000.000-00)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(formData.cpf)) {
      setError("Por favor, insira um CPF válido e completo.");
      return;
    }

    // 3. Validação de Telefone (Verifica se tem o DDD e está completo: (00) 0000-0000 ou (00) 00000-0000)
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Por favor, insira um telefone válido com o DDD.");
      return;
    }

    // 4. Validação de Senha (Mínimo de 8 caracteres)
    if (formData.password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    // 5. Validação de Confirmação de Senha
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
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

      if (response.status === 201) {
        onSuccess();
        return;
      }

      const errorData = await response.json().catch(() => ({}));
      const emailError = errorData?.errors?.email;
      const cpfError = errorData?.errors?.cpf;
      if (emailError === "emailAlreadyExists") {
        setError("Este e-mail já está cadastrado.");
      } else if (cpfError === "cpfAlreadyExists") {
        setError("Este CPF já está cadastrado.");
      } else {
        setError("Ocorreu um erro durante o cadastro.");
      }
    } catch (err) {
      setError("Ocorreu um erro durante o cadastro.");
    }
  };

  return (
    <div className="auth-right-panel-inner">
      <h2 className="auth-title">Cadastrar-se</h2>
      <p className="auth-subtitle">
        Informe os dados abaixo para criar a sua nova conta.
      </p>

      {error && <div className="auth-message error">{error}</div>}
      {successMessage && (
        <div className="auth-message success">{successMessage}</div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-field">
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
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
            placeholder="E-mail"
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
            placeholder="CPF"
            className="auth-input"
            value={formData.cpf}
            onChange={handleChange}
            maxLength="14" 
            required
          />
        </div>

        <div className="auth-input-field">
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            className="auth-input"
            value={formData.phone}
            onChange={handleChange}
            maxLength="15" 
            required
          />
        </div>

        <div className="auth-input-field">
          <input
            type="password"
            name="password"
            placeholder="Senha"
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
            placeholder="Confirme sua senha"
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