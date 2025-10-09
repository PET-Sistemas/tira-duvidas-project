import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import tiraDuvidasLogo from '../../../utils/images/Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../../../utils/images/default-profile.png'; // Imagem padrão
import editIcon from '../../../utils/images/Vector-edit.png'; // Ícone de edição
import home from '../../../utils/images/home.png'; // Ícone de casa
import sobre from '../../../utils/images/sobre.png'; // Ícone de sobre nós
import duvidas from '../../../utils/images/duvidas.jpg'; // Ícone de dúvidas
import logoUfms from '../../../utils/images/logo-ufms.png'; // Logo da UFMS
import { getUserById } from "../../../services/user.service";
import { updateUser } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";


function PerfilUsuario() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    oldPassword: "",
    provider: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    status: "",
    fotoPerfil: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Busca as informações do usuário no banco de dados
      const userId = sessionStorage.getItem("id"); // Obtém o ID do usuário do sessionStorage
      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }

      const response = await getUserById(userId);
      console.log("Dados do usuário:", response);

      setUsuario({
        email: response.email || "N/A",
        password: response.password || "N/A",
        oldPassword: response.oldPassword || "N/A",
        provider: response.provider || "N/A",
        firstName: response.firstName || "N/A",
        lastName: response.lastName || "N/A",
        phone: response.phone || "N/A",
        role: response.role || "N/A",
        status: response.status || "N/A",
        fotoPerfil: response.fotoPerfil || "N/A",
      });
    };

    fetchUserData();
  }, []);

  // Define a imagem de perfil para exibir (usa a foto do banco ou a imagem padrão)
  const fotoPerfil = usuario.fotoPerfil || defaultProfilePic;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUser(parseInt(sessionStorage.getItem("id")), {
        firstName: nome || usuario.firstName, // Mantém o valor atual se não foi editado
        lastName: sobrenome || usuario.lastName,
        email: email || usuario.email,
        phone: telefone || usuario.phone,
      });

      alert("Dados atualizados com sucesso!");
      setIsEditing(false);
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="perfil-dados-container">
      <header className="perfil-header-top">
        <div className="perfil-header-esquerda">
          <img
            src={tiraDuvidasLogo}
            alt="Tira Dúvidas Logo"
            className="perfil-logo-topo"
          />

          <nav className="perfil-navegacao">
            <a href="/" className="perfil-link-nav">
              <img src={home} alt="Início" />
              Início
            </a>
            <a href="/sobre" className="perfil-link-nav">
              <img src={sobre} alt="Sobre Nós" />
              Sobre Nós
            </a>
            <a href="/duvidas" className="perfil-link-nav">
              <img src={duvidas} alt="Dúvidas" />
              Dúvidas
            </a>
          </nav>
        </div>

        <div className="perfil-header-direita">
          <button className="perfil-botao-voltar" onClick={() => navigate(-1)}>
            VOLTAR
          </button>
        </div>
      </header>

      <main className='perfil-main-conteudo'>
        <h2 className="perfil-titulo-pagina">Meus Dados</h2>

        <div className="perfil-card-principal">
          <div className="perfil-foto-usuario">
            <img src={defaultProfilePic} alt="Foto de Perfil" />
          </div>

          <h3 className="perfil-nome-usuario">{usuario.firstName || "Usuário"}</h3>

          {!isEditing && (
            <button
              className="perfil-botao-editar"
              onClick={() => setIsEditing(true)}
            >
              <img
                src={editIcon}
                alt="Editar"
                className="perfil-icone-editar"
              />
              <span>Editar Dados</span>
            </button>
          )}

          <div className="perfil-conteudo-formulario">
            <form className="perfil-formulario" onSubmit={handleSubmit}>
              <div className="perfil-grupo-campos">
                <label className="perfil-label-campo" htmlFor="nome">
                  Nome:
                </label>
                <input
                  id="nome"
                  type="text"
                  className="perfil-input-campo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={!isEditing}
                />

                <label className="perfil-label-campo" htmlFor="sobrenome">
                  Sobrenome:
                </label>
                <input
                  id="sobrenome"
                  type="text"
                  className="perfil-input-campo"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  disabled={!isEditing}
                />

                <label className="perfil-label-campo" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="text"
                  className="perfil-input-campo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />

                <label className="perfil-label-campo" htmlFor="telefone">
                  Telefone:
                </label>
                <input
                  id="telefone"
                  type="tel"
                  className="perfil-input-campo"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  disabled={!isEditing}
                />

                <label className="perfil-label-campo" htmlFor="cpf">
                  CPF:
                </label>
                <input
                  id="cpf"
                  type="text"
                  className="perfil-input-campo"
                  value={usuario.cpf}
                  disabled
                />
              </div>

              {isEditing && (
                <div className="perfil-botoes-acao">
                  <button type="submit" className="perfil-botao-salvar">
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="perfil-botao-cancelar"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <footer className="perfil-footer-rodape">
        <img src={logoUfms} alt="Logo UFMS" className="perfil-logo-rodape" />
      </footer>
    </div>
  );
}

export default PerfilUsuario;