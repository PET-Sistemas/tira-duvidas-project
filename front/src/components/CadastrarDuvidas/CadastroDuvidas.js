import React, { useEffect, useState } from 'react';
import './CadastroDuvidas.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import defaultProfilePic from '../default-profile.png'; // Ícone de imagem vazia
import ufmsLogo from '../ufms-logo.png'; // Logo da UFMS
import { createQuestion } from '../../services/question.service.ts';
import { allCategory } from '../../services/category.service.ts';
import { useNavigate } from 'react-router-dom';

function CadastroDuvidas() {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [categories, setCategories] = useState([]); // Inicializar como array vazio
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Busca a foto de perfil do banco de dados (simulação)
    const fetchUserProfilePic = async () => {
      const photo = null; // Simulação
      setUserProfilePic(photo);
    };

    // Busca as categorias do backend
    const fetchCategories = async () => {
      try {
        const categories = await allCategory(); // Chamada ao serviço
        setCategories(categories); // Define as categorias no estado
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchUserProfilePic();
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dados de exemplo para o questioner e moderator
    const questionerId = sessionStorage.getItem('id'); // Substitua pelo ID real do questionador
    const moderatorId = 1; // Substitua pelo ID real do moderador
    const status = 'active'; // Status inicial da dúvida

    const newQuestion = {
      title: selectedCategory, // Suponha que a categoria seja o título (modifique conforme necessário)
      description,
      questionerId,
      moderatorId,
      status,
    };

    try {
      await createQuestion(newQuestion); // Chamada ao serviço de criação
      alert('Dúvida cadastrada com sucesso!');
      // Limpa os campos após o cadastro
      setSelectedCategory('');
      setDescription('');

      navigate("/");
      
    } catch (error) {
      console.error('Erro ao cadastrar dúvida:', error);
      alert('Erro ao cadastrar dúvida. Tente novamente.');
    }
  };

  return (
    <div className="cadastro-duvida-container">
      <header className="cadastro-duvida-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <h1 className="cadastro-duvida-title">Cadastro de Dúvida</h1>
        <div className="cadastro-duvida-user-icon">
          <img
            src={userProfilePic || defaultProfilePic}
            alt="Foto de Perfil"
            className="user-profile-pic-signup"
          />
        </div>
      </header>
      <form className="cadastro-duvida-form" onSubmit={handleSubmit}>
        <div className="cadastro-duvida-form-group">
          <label className='cadastro-duvida-label' htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            className="cadastro-duvida-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Selecione uma categoria...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="cadastro-duvida-form-group">
          <label className='cadastro-duvida-label' htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            className="cadastro-duvida-textarea"
            placeholder="Digite aqui a sua dúvida..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="cadastro-duvida-buttons">
          <button type="button" className="cadastro-duvida-button cadastro-duvida-cancel">
            Cancelar
          </button>
          <button type="submit" className="cadastro-duvida-button cadastro-duvida-save">
            Salvar
          </button>
        </div>
      </form>
      <footer className="cadastro-duvida-footer">
        <img src={ufmsLogo} alt="UFMS Logo" className="cadastro-duvida-logo" />
      </footer>
    </div>
  );
}

export default CadastroDuvidas;
