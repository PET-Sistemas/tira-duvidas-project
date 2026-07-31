import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import { getUserById, updateUser } from "../../../services/user.service";
import "../../modal/modal.css";
import "./UsuarioDetalhes.css";
import "../UsuariosGerenciamento/UsuariosGerenciamento.css";
import Modal from "../../modal/modal.js";

function UsuarioDetalhes() {
  const [modalDesativar, setmodalDesativar] = useState(false);
  const [modalAlterar, setmodalAlterar] = useState(false);

  const [modalDesativarSucesso, setmodalDesativarSucesso] = useState(false);
  const [modalAlterarSucesso, setmodalAlterarSucesso] = useState(false);

  if (modalDesativar || modalAlterar) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const { id } = useParams();
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
    admin: { text: "Admin", className: "fbtn blue borda bg-white perfil" },
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
      const newStatus = user.status === "active" ? "inactive" : "active";

      await updateUser({
        id: user.id,
        status: newStatus,
      });

      setUser((prevUser) => ({ ...prevUser, status: newStatus }));

      setmodalDesativar(false);
      setmodalDesativarSucesso(true);
    } catch (error) {
      alert("Erro ao alterar status");
    }
  };

const handleChangeRole = async () => {
    const newRole = user.role === "questioner" ? "respondent" : "questioner";

    try {
      await updateUser({
        id: user.id,
        role: newRole,
      });
      setUser((prevUser) => ({ ...prevUser, role: newRole }));
      setSelectedRole(newRole);

      setmodalAlterar(false);
      setmodalAlterarSucesso(true);
    } catch (error) {
      console.error("Erro ao alterar perfil", error);
      alert("Erro ao alterar perfil");
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
            <input
              type="text"
              value={user.name}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              value={user.cpf || "-"}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>Celular</label>
            <input
              type="text"
              value={user.phone || "-"}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>Data de Criação de Conta</label>
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString("pt-BR")}
              disabled
              className="input-read-only"
            />
          </div>

          <div className="form-group">
            <label>Perfil</label>
            <div className="profile-badge-container">
              <span className={currentRole.className}>{currentRole.text}</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="actions-row">
            <button
              className="btn-action btn-secondary"
              onClick={() => setmodalAlterar(true)}
            >
              Alterar permissões
            </button>

            <button
              className={`btn-action ${isUserActive ? "btn-danger" : "btn-success"}`}
              onClick={() => setmodalDesativar(true)}
            >
              {isUserActive ? "Desativar usuário" : "Ativar usuário"}
            </button>
          </div>
        </div>
      </AdminLayout>

      <Modal isOpen={modalDesativar} onClose={() => setmodalDesativar(false)}>
        <div id={"conteudo"}>
          <div className="icone-h1-container">
            <i
              className={`bi ${isUserActive ? "bi-exclamation-triangle modal-icon-danger" : "bi-check-circle modal-icon-success"}`}
            ></i>
            <h1 className="modal-title">
              {isUserActive ? "Desativar Usuário" : "Ativar Usuário"}
            </h1>
            <p className="modal-text">
              Tem certeza que deseja {isUserActive ? "desativar" : "ativar"}{" "}
              <strong>{user?.name}</strong>?
              {isUserActive && (
                <p className="modal-subtext-danger">
                  O usuário perderá o acesso ao sistema até ser reativado.
                </p>
              )}
            </p>
          </div>

          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-danger"
              onClick={() => setmodalDesativar(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`btn-action ${isUserActive ? "btn-secondary" : "btn-success"}`}
              onClick={handleDisableUser}
            >
              {isUserActive ? "Confirmar Desativação" : "Confirmar Ativação"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalAlterar} onClose={() => setmodalAlterar(false)}>
        <div id={"conteudo"}>
          <div className="icone-h1-container">
            <i className="bi bi-arrow-repeat modal-icon-blue"></i>
            <h1 className="modal-title">Alterar Permissão</h1>
            <p className="modal-text">
              Deseja alterar o perfil do usuário {" "} 
              <strong>{user?.name}</strong> 
            </p>
            <p className="modal-text">
              de <span className="badge-role"> {user?.role === "questioner" ? "Questionador" : "Respondente"}</span> 
              para <span className="badge-role">{user?.role === "questioner" ? "Respondente" : "Questionador"}</span>?
            </p>
          </div>

          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-danger"
              onClick={() => setmodalAlterar(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn-action btn-success"
              onClick={handleChangeRole}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalDesativarSucesso}
        onClose={() => setmodalDesativarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i
              className={`bi ${
                user?.status === "inactive"
                  ? "bi-slash-circle modal-icon-danger"
                  : "bi-check-circle modal-icon-success"
              }`}
            ></i>
            <h1>
              Usuário {user?.status === "inactive" ? "Desativado" : "Ativado"}{" "}
              com sucesso!
            </h1>
          </div>
          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-secondary"
              onClick={() => setmodalDesativarSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalAlterarSucesso}
        onClose={() => setmodalAlterarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className={"bi bi-check-circle"}></i>
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
    </>
  );
}

export default UsuarioDetalhes;
