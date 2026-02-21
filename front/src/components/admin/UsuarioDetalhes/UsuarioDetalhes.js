import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from "../layout/AdminLayout";
import { getUserById, updateUser} from "../../../services/user.service";
import "../../modal/modal.css"
import "./UsuarioDetalhes.css";
import "../UsuariosGerenciamento/UsuariosGerenciamento.css"
import Modal from "../../modal/modal.js"

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
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const roleMap = {
    questioner: { text: 'Questionador', className: 'fbtn blue borda bg-white perfil' },
    respondent: { text: 'Respondente', className: 'fbtn white borda bg-blue perfil' },
    admin: { text: 'Admin', className: 'fbtn blue borda bg-white perfil' },
  };
  const [selectedRole, setSelectedRole] = useState('');

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
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      await updateUser({ 
        id: user.id, 
        status: newStatus 
      });      
      setUser({ ...user, status: newStatus });
      setmodalDesativar(false);
      setmodalDesativarSucesso(true);
    } catch (error) {
      alert("Erro ao alterar status");
    }
  };

  const handleChangeRole = async () => {
    try {
      await updateUser({ 
        id: user.id, 
        role: selectedRole 
      });
      setUser({ ...user, role: selectedRole });
      setmodalAlterar(false);
      setmodalAlterarSucesso(true);

    } catch (error) {
      alert("Erro ao alterar perfil");
    }
  };

  if (loading) return <AdminLayout><div className="loading">Carregando...</div></AdminLayout>;
  if (!user) return <AdminLayout><div className="error">Usuário não encontrado.</div></AdminLayout>;

  const currentRole = roleMap[user.role] || roleMap.questioner;
  const isUserActive = user.status === 'active';

  return (
    <body>
    <AdminLayout>
      <div className="page-container-details">
        <header className="header-details">
          <h1>Gerenciamento de perfil</h1>
          <p>Informações do usuário e ações administrativas</p>
        </header>

        <div className="profile-card">
          
          {/* Formulário de Visualização */}
          <div className="form-group">
            <label>Nome completo</label>
            <input type="text" value={user.name} disabled className="input-read-only" />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input type="text" value={user.email} disabled className="input-read-only" />
          </div>

          <div className="form-group">
            <label>Celular</label>
            {/* Exemplo de formatação simples, se o dado vier puro */}
            <input type="text" value={user.phone || '-'} disabled className="input-read-only" />
          </div>

          <div className="form-group">
            <label>Data de Criação de Conta</label>
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
            <button 
                className="btn-action" 
                onClick={() => setmodalDesativar(true)}
                >
              <i className={`bi bi-${isUserActive ? 'slash-circle' : 'check-circle'}`}></i> 
              {isUserActive ? 'Desativar usuário' : 'Ativar usuário'}
            </button>

            <button 
                className="btn-action"
                onClick={() => setmodalAlterar(true)}
                >
              <i className="bi bi-pencil"></i> Alterar perfil
            </button>

            <button 
                className="btn-action"
                >
              <i className="bi bi-download"></i> Baixar relatório
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
    <Modal isOpen={modalDesativar} onClose={() => setmodalDesativar(false)}>
        <div id={"conteudo"}>
          <div className={"icone-h1-container"}>
            <h1>
                Tem certeza que deseja {isUserActive ? 'desativar' : 'ativar'} esse usuário?
            </h1>
          </div>
          <div className="div-botoes">
            <button className="botao-branco" onClick={() => setmodalDesativar(false)}>Cancelar</button>
            <button 
                className={`botao-azul ${isUserActive ? 'btn-confirm-danger' : 'btn-confirm-success'}`} 
                onClick={handleDisableUser}
                >
                {isUserActive ? 'Desativar' : 'Ativar'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalAlterar} onClose={() => setmodalAlterar(false)}>
        <div id={"conteudo"}>
          <div className="icone-h1-container">
            <h1 className="modal-title">Alterar Perfil</h1>
            <p className="modal-text">Selecione o tipo de perfil para este usuário.</p>
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label className={`radio-option ${selectedRole === 'questioner' ? 'selected' : ''}`}>
                  <input 
                      type="radio" 
                      name="roleProfile"
                      value="questioner"
                      checked={selectedRole === 'questioner'}
                      onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span className="radio-label-text">Questionador</span>
              </label>
              <label className={`radio-option ${selectedRole === 'respondent' ? 'selected' : ''}`}>
                  <input 
                      type="radio" 
                      name="roleProfile"
                      value="respondent"
                      checked={selectedRole === 'respondent'}
                      onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span className="radio-label-text">Respondente</span>
              </label>
          </div>

          <div className="div-botoes">
              <button className="botao-branco" onClick={() => setmodalAlterar(false)}>Cancelar</button>
              <button className="botao-azul" onClick={handleChangeRole}>Salvar</button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalDesativarSucesso}
        onClose={() => setmodalDesativarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className={`bi bi-${isUserActive ? 'slash-circle' : 'check-circle'}`}></i> 
            <h1>
                Usuário {isUserActive ? 'Desativado' : 'Ativado'}!
            </h1>          
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

      <Modal
        isOpen={modalAlterarSucesso}
        onClose={() => setmodalAlterarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className={"bi bi-check-circle"}></i> 
            <h1>
                Perfil alterado com sucesso!
            </h1>          
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
    </body>
  );
}

export default UsuarioDetalhes;