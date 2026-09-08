import React, { useState } from "react";
import { register } from "../../../services/user.service";
import ufmsLogo from "../../../utils/images/ufms-logo.png";

import "../Cadastrar/Cadastro.css";
import "../Auth/Auth.css";

import { useNavigate } from "react-router-dom";
import Modal from "../../modal/modal.js";
import "../../modal/modal.css";

// Função para mascarar o CPF: 000.000.000-00
const maskCPF = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// Função para mascarar o Telefone
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

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = maskCPF(value);
    }

    if (name === "phone") {
      value = maskPhone(value);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    const wasSuccess = modal.type === "success";

    setModal({
      isOpen: false,
      type: "",
      title: "",
      message: "",
    });

    // Depois de fechar o modal de sucesso,
    // pode voltar para a tela de login.
    if (wasSuccess) {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validação de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setModal({
        isOpen: true,
        type: "error",
        title: "E-mail inválido",
        message: "Por favor, insira um e-mail válido.",
      });
      return;
    }

    // 2. Validação de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!cpfRegex.test(formData.cpf)) {
      setModal({
        isOpen: true,
        type: "error",
        title: "CPF inválido",
        message: "Por favor, insira um CPF válido e completo.",
      });
      return;
    }

    // 3. Validação de Telefone
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    if (!phoneRegex.test(formData.phone)) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Telefone inválido",
        message: "Por favor, insira um telefone válido com o DDD.",
      });
      return;
    }

    // 4. Validação de Senha
    if (formData.password.length < 8) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Senha inválida",
        message: "A senha deve ter no mínimo 8 caracteres.",
      });
      return;
    }

    // 5. Confirmação de Senha
    if (formData.password !== formData.confirmPassword) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Senhas diferentes",
        message: "As senhas não coincidem.",
      });
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
        setModal({
          isOpen: true,
          type: "success",
          title: "Cadastro realizado!",
          message:
            "Cadastro realizado com sucesso! Enviamos um link de confirmação para o seu e-mail. Verifique sua caixa de entrada para ativar sua conta.",
        });


      if (response.status === 201) { 
        setSuccessMessage(
          "Cadastro realizado com sucesso! Enviamos um link de confirmação para o seu e-mail. Verifique sua caixa de entrada para ativar sua conta."
        );

        return;
      }

      const errorData = await response.json().catch(() => ({}));
      const backendMessage = errorData?.message;

      if (backendMessage === "emailAlreadyExists") {
        setModal({
          isOpen: true,
          type: "error",
          title: "E-mail já cadastrado",
          message: "Este e-mail já está cadastrado.",
        });
      } else if (backendMessage === "cpfAlreadyExists") {
        setModal({
          isOpen: true,
          type: "error",
          title: "CPF já cadastrado",
          message: "Este CPF já está cadastrado.",
        });
      } else {
        setModal({
          isOpen: true,
          type: "error",
          title: "Erro no cadastro",
          message:
            typeof backendMessage === "string"
              ? backendMessage
              : "Ocorreu um erro durante o cadastro.",
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Erro de conexão",
        message:
          "Erro de conexão com o servidor. Tente novamente mais tarde.",
      });
    }
  };

  return (
    <div className="auth-right-panel-inner">
      <h2 className="auth-title">Cadastrar-se</h2>

      <p className="auth-subtitle">
        Informe os dados abaixo para criar a sua nova conta.
      </p>

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

      <img
        src={ufmsLogo}
        alt="UFMS Logo"
        className="auth-ufms-logo"
      />

      {/* Modal de mensagens */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
      >
        <div id={modal.type === "success" ? "sucesso" : "conteudo"}>
          <div className="icone-h1-container">

            {modal.type === "success" ? (
              <i className="bi bi-check-circle modal-icon-success"></i>
            ) : (
              <i className="bi bi-exclamation-circle modal-icon-danger"></i>
            )}

            <h1 className="modal-title">
              {modal.title}
            </h1>

            <p className="modal-text">
              {modal.message}
            </p>
          </div>

          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-secondary"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CadastroContent;