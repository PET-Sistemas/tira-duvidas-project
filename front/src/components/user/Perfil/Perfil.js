import React, { useEffect, useState } from "react";

import "./Perfil.css";

import { updateUser } from "../../../services/user.service";

import { useNavigate } from "react-router-dom";

import UserLayout from "../Layout/UserLayout";

import Modal from "../../modal/modal.js";

function PerfilUsuario() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [nome, setNome] = useState(
    sessionStorage.getItem("username") || ""
  );

  const [cpf, setCpf] = useState(
    sessionStorage.getItem("cpf") || ""
  );

  const [email, setEmail] = useState(
    sessionStorage.getItem("email") || ""
  );

  const [telefone, setTelefone] = useState(
    sessionStorage.getItem("telefone") || ""
  );

  const [usuario, setUsuario] = useState({
    email: "",
    name: "",
    provider: "",
    phone: "",
    role: "",
    status: "",
    fotoPerfil: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    // const fetchUserData = async () => {
    //   // Busca as informações do usuário no banco de dados
    //   const userId = sessionStorage.getItem("id");

    //   if (!userId) {
    //     console.error("Usuário não autenticado");
    //     return;
    //   }

    //   const response = await getUserById(userId);

    //   setUsuario({
    //     email: response.email || "N/A",
    //     name: response.firstName || "N/A",
    //     phone: response.phone || "N/A",
    //     role: response.role || "N/A",
    //     status: response.status || "N/A",
    //     fotoPerfil: response.fotoPerfil || "N/A",
    //   });
    // };

    // fetchUserData();
  }, []);

  // Define a imagem de perfil para exibir
  // const fotoPerfil = usuario.fotoPerfil || defaultProfilePic;

  const handleCloseModal = () => {
    const shouldNavigate = modal.type === "success";

    setModal({
      isOpen: false,
      type: "",
      title: "",
      message: "",
    });

    if (shouldNavigate) {
      navigate("/perfil");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome.trim() || !telefone.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Campos obrigatórios",
        message:
          "Os campos Nome e Telefone são obrigatórios e não podem ficar em branco.",
      });

      return;
    }


    if (!nome.trim() || !telefone.trim()) {
      alert(
        "Erro: Os campos Nome e Telefone são obrigatórios e não podem ficar em branco.",
      );
      return;
    }


    try {
      await updateUser({
        id: sessionStorage.getItem("id"),
        name: nome,
        email: email,
        phone: telefone,
        cpf: cpf,
      });

      setIsEditing(false);

      sessionStorage.setItem("username", nome);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("telefone", telefone);
      sessionStorage.setItem("cpf", cpf);

      setModal({
        isOpen: true,
        type: "success",
        title: "Dados atualizados!",
        message: "Seus dados foram atualizados com sucesso.",
      });
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário:",
        error.message
      );

      setModal({
        isOpen: true,
        type: "error",
        title: "Erro",
        message: `Não foi possível atualizar seus dados. ${error.message}`,
      });
    }
  };

  return (
    <UserLayout>

      {/* Modal de mensagens */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
      >
        <div
          id={
            modal.type === "success"
              ? "sucesso"
              : "conteudo"
          }
        >
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

      <div className="header-div">
        <h1>Meu Perfil</h1>

        <p>
          Visualize e edite suas informações pessoais
        </p>
      </div>

      <div className="details-form-wrapper">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="nome">
              Nome:
            </label>

            <input
              id="nome"
              type="text"
              className="input-read-only"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">
              CPF:
            </label>

            <input
              id="cpf"
              type="text"
              className="input-read-only"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email:
            </label>

            <input
              id="email"
              type="text"
              className="input-read-only"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">
              Telefone:
            </label>

            <input
              id="telefone"
              type="tel"
              className="input-read-only"
              value={telefone}
              onChange={(e) =>
                setTelefone(e.target.value)
              }
              disabled={!isEditing}
              required
            />
          </div>

          <div className="actions-row">

            {!isEditing ? (

              <button
                type="button"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                Editar Dados
              </button>

            ) : (

              <>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Salvar
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsEditing(false)}
                  onClick={() => {
                    setNome(
                      sessionStorage.getItem("username") || ""
                    );

                    setTelefone(
                      sessionStorage.getItem("telefone") || ""
                    );

                    setIsEditing(false);
                  }}

                  onClick={() => {
                    setNome(sessionStorage.getItem("username") || "");
                    setTelefone(sessionStorage.getItem("telefone") || "");
                    setIsEditing(false);
                  }}

                >
                  Cancelar
                </button>
              </>

            )}

          </div>

        </form>
      </div>

    </UserLayout>
  );
}

export default PerfilUsuario;