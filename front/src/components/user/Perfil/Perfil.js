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
import UserLayout from '../Layout/UserLayout';


function PerfilUsuario() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [usuario, setUsuario] = useState({
    email: "",
    name: "",
    provider: "",
    phone: "",
    role: "",
    status: "",
    fotoPerfil: "",
  });

  useEffect(() => {
    // const fetchUserData = async () => {
    //   // Busca as informações do usuário no banco de dados
    //   const userId = sessionStorage.getItem("id"); // Obtém o ID do usuário do sessionStorage
    //   if (!userId) {
    //     console.error("Usuário não autenticado");
    //     return;
    //   }

    //   const response = await getUserById(userId);
    //   console.log("Dados do usuário:", response);

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

  // Define a imagem de perfil para exibir (usa a foto do banco ou a imagem padrão)
  const fotoPerfil = usuario.fotoPerfil || defaultProfilePic;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUser({
        id: sessionStorage.getItem("id"),
        name: nome,
        email: email,
        phone: telefone,
      });

      alert("Dados atualizados com sucesso!");
      setIsEditing(false);

      sessionStorage.setItem("username", nome);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("telefone", telefone);

      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <UserLayout>
      <main className='perfil-main-conteudo'>
        <h2 className="perfil-titulo-pagina">Meus Dados</h2>

        <div className="perfil-card-principal">
          <div className="perfil-foto-usuario">
            <img src={defaultProfilePic} alt="Foto de Perfil" />
          </div>

          <h3 className="perfil-nome-usuario">{sessionStorage.getItem("username") || "Usuário"}</h3>

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
                  placeholder={`${sessionStorage.getItem("username")}`}
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
                  placeholder={`${sessionStorage.getItem("email")}`}
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
                  placeholder={`${sessionStorage.getItem("telefone")}`}
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
    </UserLayout>
  );
}

export default PerfilUsuario;