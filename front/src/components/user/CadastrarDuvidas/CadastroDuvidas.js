import React, { useEffect, useState } from "react";
import "./CadastroDuvidas.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png"; // Logo do Tira Dúvidas
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Ícone de imagem vazia
import logoUfms from "../../../utils/images/logo-ufms.png"; // Logo da UFMS
import { createQuestion } from "../../../services/question.service";
import { allCategory } from "../../../services/category.service";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";

function CadastroDuvidas() {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [categories, setCategories] = useState([]); // Inicializar como array vazio
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);

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
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchUserProfilePic();
    fetchCategories();
  }, []);

  const translate = {
    active: "ativo",
    inactive: "inativo",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const questionerId = sessionStorage.getItem("id"); 
    const status = "not_answered"; 

    const newQuestion = {
      title, 
      description,
      questionerId,
      categories: [selectedCategory],
      status,
    };

    console.log(newQuestion);

    try {
      const response = await createQuestion(newQuestion); 
      
      if(!response.ok) {
        throw new Error("Erro ao cadastrar dúvida");
      }

      alert("Dúvida cadastrada com sucesso!");
      // Limpa os campos após o cadastro
      setTitle("");
      setSelectedCategory("");
      setDescription("");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar dúvida:", error);
      alert("Erro ao cadastrar dúvida. Tente novamente.");
    }
  };

  return (
    <UserLayout>
      <form className="cadastro-duvida-form" onSubmit={handleSubmit}>
        <div className="cadastro-duvida-form-group">
          <label className="cadastro-duvida-label" htmlFor="categoria">
            Categoria:
          </label>
          <select
            id="categoria"
            className="cadastro-duvida-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Selecione uma categoria...
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="cadastro-duvida-form-group">
          {showErrors && (
            <div className="cadastro-duvida-errors">
              <p className="cadastro-duvida-error-text">
                Por favor, preencha todos os campos.
              </p>
            </div>
          )}
          <label className="cadastro-duvida-label" htmlFor="descricao">
            Título:
          </label>
          <input
            id="titulo"
            type="text"
            className="cadastro-duvida-titulo"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="cadastro-duvida-label" htmlFor="descricao">
            Descrição:
          </label>
          <textarea
            id="descricao"
            className="cadastro-duvida-textarea"
            placeholder="Digite aqui a sua dúvida..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="cadastro-duvida-buttons">
          <button
            type="button"
            className="cadastro-duvida-button"
            id="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          {!title && !description ? (
            <button
              type="submit"
              className="cadastro-duvida-button"
              id="save-button"
              disabled
            >
              Salvar
            </button>
          ) : (
            <button
              type="submit"
              className="cadastro-duvida-button"
              id="save-button"
            >
              Salvar
            </button>
          )}
        </div>
      </form>
    </UserLayout>
  );
}

export default CadastroDuvidas;
