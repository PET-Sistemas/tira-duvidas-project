<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from "../Layout/AdminLayout";
import { getUserById, updateUser} from "../../../services/user.service";
import "../../modal/modal.css"
=======
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";

import { getUserById, updateUser } from "../../../services/user.service";

import "../../modal/modal.css";
>>>>>>> Stashed changes
import "./UsuarioDetalhes.css";
import "../UsuariosGerenciamento/UsuariosGerenciamento.css";

import Modal from "../../modal/modal.js";

function UsuarioDetalhes() {
  const [modalDesativar, setmodalDesativar] = useState(false);
  const [modalAlterar, setmodalAlterar] = useState(false);

  const [modalDesativarSucesso, setmodalDesativarSucesso] = useState(false);
  const [modalAlterarSucesso, setmodalAlterarSucesso] = useState(false);

  const [modalErro, setModalErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  if (modalDesativar || modalAlterar) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

<<<<<<< Updated upstream
  const { id } = useParams(); 
=======
  function maskCPF(cpf) {
    if (!cpf) return "-";

    const digits = cpf.replace(/\D/g, "");

    if (digits.length !== 11) return "-";

    return `${digits.slice(0, 3)}.***.***-**`;
  }

  function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("pt-BR");
  }

  const { id } = useParams();
>>>>>>> Stashed changes
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const roleMap = {
    questioner: {
      text: "Questionador",
      className: "fbtn blue borda bg-white perfil",
    },

    respondent: {
      text: "Respondente",
      className: "fbtn white borda bg-blue perfil",
    },

    admin: {
      text: "Admin",
      className: "fbtn blue borda bg-white perfil",
    },
  };
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
        setSelectedRole(data.role);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDisableUser = async () => {
    try {
<<<<<<< Updated upstream
      const newStatus = user.status === "active" ? "inactive" : "active";
=======
      const newStatus =
        user.status === "active" ? "inactive" : "active";

>>>>>>> Stashed changes
      await updateUser({
        id: user.id,
        status: newStatus,
      });
<<<<<<< Updated upstream
      setUser({ ...user, status: newStatus });
=======

      setUser((prevUser) => ({
        ...prevUser,
        status: newStatus,
      }));

>>>>>>> Stashed changes
      setmodalDesativar(false);
      setmodalDesativarSucesso(true);
    } catch (error) {
      console.error("Erro ao alterar status", error);

      setMensagemErro("Erro ao alterar status");
      setModalErro(true);
    }
  };

  const handleChangeRole = async () => {
<<<<<<< Updated upstream
=======
    const newRole =
      user.role === "questioner" ? "respondent" : "questioner";

>>>>>>> Stashed changes
    try {
      await updateUser({
        id: user.id,
        role: selectedRole,
      });
<<<<<<< Updated upstream
      setUser({ ...user, role: selectedRole });
      setmodalAlterar(false);
      setmodalAlterarSucesso(true);
    } catch (error) {
      alert("Erro ao alterar perfil");
=======

      setUser((prevUser) => ({
        ...prevUser,
        role: newRole,
      }));

      setmodalAlterar(false);
      setmodalAlterarSucesso(true);
    } catch (error) {
      console.error("Erro ao alterar perfil", error);

      setMensagemErro("Erro ao alterar perfil");
      setModalErro(true);
>>>>>>> Stashed changes
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="loading">Carregando...</div>
      </AdminLayout>
    );

  if (!user)
    return (
      <AdminLayout>
        <div className="error">Usuário não encontrado.</div>
      </AdminLayout>
    );

  const currentRole = roleMap[user.role] || roleMap.questioner;
  const isUserActive = user.status === "active";

  return (
    <>
    <AdminLayout>
        <div className="header-div">
          <h1>Gerenciamento de Perfil</h1>
          <p>Informações do usuário e ações administrativas</p>
        </div>

        <div className="details-form-wrapper">
          <div className="form-group">
            <label>Nome completo</label>
<<<<<<< Updated upstream
            <input type="text" value={user.name} disabled className="input-read-only" />
=======

            <input
              type="text"
              value={user.name}
              disabled
              className="input-read-only"
            />
>>>>>>> Stashed changes
          </div>

          <div className="form-group">
            <label>E-mail</label>
<<<<<<< Updated upstream
            <input type="text" value={user.email} disabled className="input-read-only" />
=======

            <input
              type="text"
              value={user.email}
              disabled
              className="input-read-only"
            />
>>>>>>> Stashed changes
          </div>

          <div className="form-group">
            <label>CPF</label>
<<<<<<< Updated upstream
            <input type="text" value={user.cpf || '-'} disabled className="input-read-only" />
=======

            <input
              type="text"
              value={maskCPF(user.cpf)}
              disabled
              className="input-read-only"
            />
>>>>>>> Stashed changes
          </div>

          <div className="form-group">
            <label>Celular</label>
<<<<<<< Updated upstream
            <input type="text" value={user.phone || '-'} disabled className="input-read-only" />
=======

            <input
              type="text"
              value={user.phone || "-"}
              disabled
              className="input-read-only"
            />
>>>>>>> Stashed changes
          </div>

          <div className="form-group">
            <label>Data de Criação de Conta</label>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString('pt-BR')}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>Perfil</label>

            <div className="profile-badge-container">
              <span className={currentRole.className}>
                {currentRole.text}
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="actions-row">
<<<<<<< Updated upstream
            <button
              className="btn-primary"
              onClick={() => setmodalDesativar(true)}
            >
              {isUserActive ? "Desativar usuário" : "Ativar usuário"}
            </button>

            <button
              className="btn-primary"
              onClick={() => setmodalAlterar(true)}
            >
              Alterar perfil
            </button>
          </div>
        </div>
    </AdminLayout>
      <Modal isOpen={modalDesativar} onClose={() => setmodalDesativar(false)}>
        <div id={"conteudo"}>
          <div className={"icone-h1-container"}>
            <h1>
              Tem certeza que deseja {isUserActive ? "desativar" : "ativar"}{" "}
              esse usuário?
            </h1>
=======
            {user.role !== "admin" && (
              <button
                className="btn-action btn-secondary"
                onClick={() => setmodalAlterar(true)}
              >
                Alterar permissões
              </button>
            )}

            {user.role !== "admin" && (
              <button
                className={`btn-action ${
                  isUserActive ? "btn-danger" : "btn-success"
                }`}
                onClick={() => setmodalDesativar(true)}
              >
                {isUserActive
                  ? "Desativar usuário"
                  : "Ativar usuário"}
              </button>
            )}
          </div>
        </div>
      </AdminLayout>

      {/* Modal de desativação/ativação */}
      <Modal
        isOpen={modalDesativar}
        onClose={() => setmodalDesativar(false)}
      >
        <div id={"conteudo"}>
          <div className="icone-h1-container">
            <i
              className={`bi ${
                isUserActive
                  ? "bi-exclamation-triangle modal-icon-danger"
                  : "bi-check-circle modal-icon-success"
              }`}
            ></i>

            <h1 className="modal-title">
              {isUserActive
                ? "Desativar Usuário"
                : "Ativar Usuário"}
            </h1>

            <p className="modal-text">
              Tem certeza que deseja{" "}
              {isUserActive ? "desativar" : "ativar"}{" "}
              <strong>{user?.name}</strong>?

              {isUserActive && (
                <p className="modal-subtext-danger">
                  O usuário perderá o acesso ao sistema até ser
                  reativado.
                </p>
              )}
            </p>
>>>>>>> Stashed changes
          </div>
          <div className="div-botoes">
            <button
              className="btn-primary"
              onClick={() => setmodalDesativar(false)}
            >
              Cancelar
            </button>

            <button
<<<<<<< Updated upstream
              className={`btn-primary ${isUserActive ? "btn-confirm-danger" : "btn-confirm-success"}`}
              onClick={handleDisableUser}
            >
              {isUserActive ? "Desativar" : "Ativar"}
=======
              type="button"
              className={`btn-action ${
                isUserActive ? "btn-secondary" : "btn-success"
              }`}
              onClick={handleDisableUser}
            >
              {isUserActive
                ? "Confirmar Desativação"
                : "Confirmar Ativação"}
>>>>>>> Stashed changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de alteração de permissão */}
      <Modal
        isOpen={modalAlterar}
        onClose={() => setmodalAlterar(false)}
      >
        <div id={"conteudo"}>
          <div className="icone-h1-container">
<<<<<<< Updated upstream
            <h1 className="modal-title">Alterar Perfil</h1>
            <p className="modal-text">
              Selecione o tipo de perfil para este usuário.
=======
            <i className="bi bi-arrow-repeat modal-icon-blue"></i>

            <h1 className="modal-title">
              Alterar Permissão
            </h1>

            <p className="modal-text">
              Deseja alterar o perfil do usuário{" "}
              <strong>{user?.name}</strong> de{" "}
              <span className="badge-role">
                {user?.role === "questioner"
                  ? "Questionador"
                  : "Respondente"}
              </span>{" "}
              para{" "}
              <span className="badge-role">
                {user?.role === "questioner"
                  ? "Respondente"
                  : "Questionador"}
              </span>
              ?
>>>>>>> Stashed changes
            </p>
          </div>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              className={`radio-option ${selectedRole === "questioner" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="roleProfile"
                value="questioner"
                checked={selectedRole === "questioner"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-label-text">Questionador</span>
            </label>
            <label
              className={`radio-option ${selectedRole === "respondent" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="roleProfile"
                value="respondent"
                checked={selectedRole === "respondent"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-label-text">Respondente</span>
            </label>
          </div>

          <div className="div-botoes">
            <button
              className="btn-primary"
              onClick={() => setmodalAlterar(false)}
            >
              Cancelar
            </button>
<<<<<<< Updated upstream
            <button className="btn-primary" onClick={handleChangeRole}>
              Salvar
=======

            <button
              type="button"
              className="btn-action btn-success"
              onClick={handleChangeRole}
            >
              Confirmar
>>>>>>> Stashed changes
            </button>
          </div>
        </div>
      </Modal>
<<<<<<< Updated upstream
=======

      {/* Modal de sucesso ao ativar/desativar */}
>>>>>>> Stashed changes
      <Modal
        isOpen={modalDesativarSucesso}
        onClose={() => setmodalDesativarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i
              className={`bi bi-${isUserActive ? "slash-circle" : "check-circle"}`}
            ></i>
<<<<<<< Updated upstream
            <h1>Usuário {isUserActive ? "Desativado" : "Ativado"}!</h1>
=======

            <h1>
              Usuário{" "}
              {user?.status === "inactive"
                ? "Desativado"
                : "Ativado"}{" "}
              com sucesso!
            </h1>
>>>>>>> Stashed changes
          </div>

          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalDesativarSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de sucesso ao alterar perfil */}
      <Modal
        isOpen={modalAlterarSucesso}
        onClose={() => setmodalAlterarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
<<<<<<< Updated upstream
            <i className={"bi bi-check-circle"}></i>
=======
            <i
              className={
                "bi bi-check-circle modal-icon-success"
              }
            ></i>

>>>>>>> Stashed changes
            <h1>Perfil alterado com sucesso!</h1>
          </div>

          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalAlterarSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de erro */}
      <Modal
        isOpen={modalErro}
        onClose={() => setModalErro(false)}
      >
        <div id={"conteudo"}>
          <div className="icone-h1-container">
            <i className="bi bi-exclamation-circle modal-icon-danger"></i>

            <h1 className="modal-title">Erro</h1>

            <p className="modal-text">{mensagemErro}</p>
          </div>

          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-secondary"
              onClick={() => setModalErro(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UsuarioDetalhes;