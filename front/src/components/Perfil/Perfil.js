import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../default-profile.png'; // Imagem padrão
import editIcon from '../Vector-edit.png'; // Ícone de edição
import { getUserById } from '../../services/user.service.ts';
import { useNavigate } from 'react-router-dom';

function PerfilUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    fotoPerfil: ''  // Adiciona o campo fotoPerfil
  });

  useEffect(() => {
    const fetchUserData = async () => {

      // Busca as informações do usuário no banco de dados
      const userId = sessionStorage.getItem('id'); // Obtém o ID do usuário do sessionStorage
      if (!userId) {
        console.error('Usuário não autenticado');
        return;
      }

      const response = await getUserById(userId);
      console.log('Dados do usuário:', response);
      
      setUsuario({
        nome: response.firstName || 'N/A',
        email: response.email || 'N/A',
        telefone: response.phone || 'N/A',
        cpf: response.cpf || 'N/A',
        fotoPerfil: response.fotoPerfil || 'N/A'
      })
    };

    fetchUserData();
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
        <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
      </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;