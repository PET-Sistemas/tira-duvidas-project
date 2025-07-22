import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../default-profile.png'; // Imagem padrão
import editIcon from '../Vector-edit.png'; // Ícone de edição
import { getUserById } from '../../services/user.service.ts';
import { updateUser } from '../../services/user.service.ts';
import { useNavigate } from 'react-router-dom';

function PerfilUsuario() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

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
    fotoPerfil: ""
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
        email: response.email || 'N/A',
        password: response.password || 'N/A',
        oldPassword: response.oldPassword || 'N/A',
        provider: response.provider || 'N/A',
        firstName: response.firstName || 'N/A',
        lastName: response.lastName || 'N/A',
        phone: response.phone || 'N/A',
        role: response.role || 'N/A',
        status: response.status || 'N/A',
        fotoPerfil: response.fotoPerfil || 'N/A'
      })
    };

    fetchUserData();
  }, []);

  // Define a imagem de perfil para exibir (usa a foto do banco ou a imagem padrão)
  const fotoPerfil = usuario.fotoPerfil || defaultProfilePic;

  const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await updateUser(parseInt(sessionStorage.getItem('id')), {
          firstName: nome || usuario.firstName, // Mantém o valor atual se não foi editado
          lastName: sobrenome || usuario.lastName,
          email: email || usuario.email,
          phone: telefone || usuario.phone,
        });

        alert('Dados atualizados com sucesso!');
        setIsEditing(false);
        navigate('/perfil');
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        alert(`Erro: ${error.message}`);
       }
    };

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
          <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
            <img src={editIcon} alt="Edit Icon" className="edit-icon-profile" />
            <p>Editar Dados</p>
          </button>
        </div>  

        {isEditing ? (
          <div className="edit-profile-form">
            <form className="editar-dados-form" onSubmit={handleSubmit}>
              <label className='atualizar-dados-label' htmlFor="nome">Nome:</label>
              <input
                id="nome"
                type="text"
                className="nome-input"
                placeholder={usuario.firstName || 'Nome'}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              /> 

              <label className='atualizar-dados-label' htmlFor="sobrenome">Sobrenome:</label>
              <input
                id="sobrenome"
                type="text"
                className="sobrenome-input"
                placeholder={usuario.lastName || 'Sobrenome'}
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />              
              
              <label className='editar-dados-label' htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                className="email-input"
                placeholder={usuario.email || 'joao@ex.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className='editar-dados-label' htmlFor="telefone">Telefone:</label>
              <input
                id="telefone"
                type="text"
                className="telefone-input"
                placeholder={usuario.telefone || '67912345678'}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />     
              <button className="save-button">Salvar</button>
            </form>
          </div>
        ) : (
          <div className="meus-dados-content">
            <div className="user-info">
              <p><strong className='titulo-dados-pessoais'>Primeiro Nome:</strong> {usuario.firstName || 'N/A'}</p>
              <p><strong className='titulo-dados-pessoais'>Sobrenome:</strong> {usuario.lastName || 'N/A'}</p>
              <p><strong className='titulo-dados-pessoais'>Email:</strong> {usuario.email || 'N/A'}</p>
              <p><strong className='titulo-dados-pessoais'>Telefone:</strong> {usuario.phone || 'N/A'}</p>
              <p><strong className='titulo-dados-pessoais'>CPF:</strong> {usuario.cpf || 'N/A'}</p>
            </div>
            <button className="back-button" onClick={() => navigate('/')}>Página Inicial</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilUsuario;