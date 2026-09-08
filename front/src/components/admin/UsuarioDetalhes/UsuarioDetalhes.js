import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
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

  useEffect(() => {
    if (!modalDesativarSucesso && !modalAlterarSucesso) return undefined;

    const timeoutId = window.setTimeout(() => {
      setmodalDesativarSucesso(false);
      setmodalAlterarSucesso(false);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [modalDesativarSucesso, modalAlterarSucesso]);

  if (modalDesativar || modalAlterar) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

 function maskCPF(cpf) {
  if (!cpf) return '-';
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return '-';
  return `${digits.slice(0, 3)}.***.***-**`;
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-'; // data inválida
  return date.toLocaleDateString('pt-BR');
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
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
        <div className="page-container-details">
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
            <input type="text" value={maskCPF(user.cpf)} disabled className="input-read-only" />
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
              value={formatDate(user.createdAt)}
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

          <div className="actions-row">
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
              className={`btn-action ${isUserActive ? "btn-danger" : "btn-success"}`}
              onClick={() => setmodalDesativar(true)}
              >
              {isUserActive ? "Desativar usuário" : "Ativar usuário"}
              </button>
            )}
          </div>
        </div>
        </div>
      </AdminLayout>
      <Modal isOpen={modalDesativar} onClose={() => setmodalDesativar(false)}>
        <div className="modal-duvida">
          <i className={`bi ${isUserActive ? "bi-person-x" : "bi-person-check"} modal-duvida-icone`} aria-hidden="true"></i>
          <h2>{isUserActive ? "Desativar usuário?" : "Ativar usuário?"}</h2>
          <p>
            Confirma que deseja {isUserActive ? "desativar" : "ativar"}{" "}
            <strong>{user?.name}</strong>?
            {isUserActive && " O acesso ao sistema ficará suspenso até a reativação."}
          </p>
          <div className="modal-duvida-acoes">
            <button
              type="button"
              className="modal-duvida-btn secundario"
              onClick={() => setmodalDesativar(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`modal-duvida-btn ${isUserActive ? "perigo" : "primario"}`}
              onClick={handleDisableUser}
            >
              {isUserActive ? "Desativar" : "Ativar"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalAlterar} onClose={() => setmodalAlterar(false)}>
        <div className="modal-duvida">
          <i className="bi bi-arrow-repeat modal-duvida-icone" aria-hidden="true"></i>
          <h2>Alterar permissão?</h2>
          <p>
            Alterar o perfil de <strong>{user?.name}</strong> de{" "}
            <strong>{user?.role === "questioner" ? "Questionador" : "Respondente"}</strong>{" "}
            para <strong>{user?.role === "questioner" ? "Respondente" : "Questionador"}</strong>?
          </p>
          <div className="modal-duvida-acoes">
            <button
              type="button"
              className="modal-duvida-btn secundario"
              onClick={() => setmodalAlterar(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="modal-duvida-btn primario"
              onClick={handleChangeRole}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalDesativarSucesso}
        onClose={() => {}}
      >
        <div className="modal-duvida modal-duvida-sucesso" role="status">
          <i className="bi bi-check-circle modal-duvida-icone" aria-hidden="true"></i>
          <h2>Usuário {user?.status === "inactive" ? "desativado" : "ativado"}</h2>
          <p>A alteração foi realizada com sucesso.</p>
        </div>
      </Modal>

      <Modal
        isOpen={modalAlterarSucesso}
        onClose={() => {}}
      >
        <div className="modal-duvida modal-duvida-sucesso" role="status">
          <i className="bi bi-check-circle modal-duvida-icone" aria-hidden="true"></i>
          <h2>Permissão alterada</h2>
          <p>O perfil do usuário foi atualizado com sucesso.</p>
        </div>
      </Modal>
    </>
  );
}

export default UsuarioDetalhes;
