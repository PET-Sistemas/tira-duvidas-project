import React, { useEffect, useState } from 'react';
import './CadastroDuvidas.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../default-profile.png'; // Ícone de imagem vazia
import ufmsLogo from '../ufms-logo.png'; // Logo da UFMS

function CadastroDuvidas() {
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    // Simulação de busca da foto de perfil do banco de dados
    const fetchUserProfilePic = async () => {
      // Suponha que você obtenha a URL da foto aqui
      const photo = null; // Altere para simular a presença/ausência de foto
      setUserProfilePic(photo);
    };

    fetchUserProfilePic();
  }, []);

  return (
    <div className="cadastro-duvida-container">
      <header className="cadastro-duvida-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <h1 className="cadastro-duvida-title">Cadastro de Dúvida</h1>
        <div className="cadastro-duvida-user-icon">
          <img
            src={userProfilePic ? userProfilePic : defaultProfilePic}
            alt="Foto de Perfil"
            className="user-profile-pic-signup"
          />
        </div>
      </header>
      <form className="cadastro-duvida-form">
        <div className="cadastro-duvida-form-group">
          <label className='cadastro-duvida-label' htmlFor="categoria">Categoria:</label>
          <select id="categoria" className="cadastro-duvida-input">
            <option className='label-input-option'>Selecione uma categoria...</option>
          </select>
        </div>
        <div className="cadastro-duvida-form-group">
          <label className='cadastro-duvida-label' htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" className="cadastro-duvida-textarea" placeholder="Digite aqui a sua dúvida..."></textarea>
        </div>
        <div className="cadastro-duvida-buttons">
          <button type="button" className="cadastro-duvida-button cadastro-duvida-cancel">Cancelar</button>
          <button type="submit" className="cadastro-duvida-button cadastro-duvida-save">Salvar</button>
        </div>
      </form>
      <footer className="cadastro-duvida-footer">
      <img src={ufmsLogo} alt="UFMS Logo" className="cadastro-duvida-logo" />
      </footer>
    </div>
  );
}

export default CadastroDuvidas;
