import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../default-profile.png'; // Imagem padrão
import editIcon from '../Vector-edit.png'; // Ícone de edição

function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    fotoPerfil: ''  // Adiciona o campo fotoPerfil
  });

  useEffect(() => {
    // Busca as informações do usuário no banco de dados
    axios.get('/api/usuario-perfil')
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar informações do usuário:', error);
      });
  }, []);

  // Define a imagem de perfil para exibir (usa a foto do banco ou a imagem padrão)
  const fotoPerfil = usuario.fotoPerfil || defaultProfilePic;

  return (
    <div className="dados-container">
      <header className="meus-dados-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-meus-dados" />
        <h1 className='title-meus-dados'>Meus Dados Pessoais</h1>
      </header>

      <div className='meus-dados-container'>
      <div className="translucent-background">
        <div className="user-profile-pic">
          <img src={fotoPerfil} alt="Foto de Perfil" />
        </div>
        <button className="edit-profile-button">
          <img src={editIcon} alt="Edit Icon" className="edit-icon-profile" />
          <p>Editar Dados</p>
        </button>
      </div>

      <div className="meus-dados-content">
        <div className="user-info">
          <p><strong className='titulo-dados-pessoais'>Nome:</strong> {usuario.nome || 'N/A'}</p>
          <p><strong className='titulo-dados-pessoais'>Email:</strong> {usuario.email || 'N/A'}</p>
          <p><strong className='titulo-dados-pessoais'>Telefone:</strong> {usuario.telefone || 'N/A'}</p>
          <p><strong className='titulo-dados-pessoais'>CPF:</strong> {usuario.cpf || 'N/A'}</p>
        </div>
        <button className="back-button">VOLTAR</button>
      </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;