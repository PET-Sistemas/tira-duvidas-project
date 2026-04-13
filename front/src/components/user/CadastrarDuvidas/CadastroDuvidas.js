import React, { useEffect, useState } from "react";
import "./CadastroDuvidas.css";
import "../../global.css";
import { createQuestion } from "../../../services/question.service";
import { allCategory } from "../../../services/category.service";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";

function CadastroDuvidas() {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);

  // Estado para a categoria personalizada ("Outra")
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    const fetchUserProfilePic = async () => {
      const photo = null;
      setUserProfilePic(photo);
    };

    const fetchCategories = async () => {
      try {
        const categories = await allCategory();
        setCategories(categories);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCustomCategory("");
  };

  const handleCustomModalConfirm = () => {
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;
    setCustomCategory(trimmed);
    setSelectedCategory("__outra__");
    setCustomCategoryInput("");
    setShowCustomModal(false);
  };

  const handleCustomModalCancel = () => {
    setCustomCategoryInput("");
    setShowCustomModal(false);
    // Se não havia categoria selecionada antes, reseta o select
    if (selectedCategory === "__outra__" && !customCategory) {
      setSelectedCategory("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionerId = Number(sessionStorage.getItem("id"));
    const status = "not_answered";

    const isCustom = selectedCategory === "__outra__" && customCategory;

    const newQuestion = {
      title,
      description,
      questionerId,
      status,
      ...(isCustom
        ? { categories: [], customCategory }
        : { categories: [selectedCategory] }),
    };

    try {
      const response = await createQuestion(newQuestion);

      if (!response.ok) {
        throw new Error("Erro ao cadastrar dúvida");
      }

      alert("Dúvida cadastrada com sucesso!");
      setTitle("");
      setSelectedCategory("");
      setDescription("");
      setCustomCategory("");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar dúvida:", error);
      alert("Erro ao cadastrar dúvida. Tente novamente.");
    }
  };

  return (
    <UserLayout>
      {/* Modal para categoria personalizada */}
      {showCustomModal && (
        <div className="custom-category-overlay">
          <div className="custom-category-modal">
            <h3>Categoria personalizada</h3>
            <p>Digite o nome da categoria para esta dúvida:</p>
            <input
              type="text"
              className="custom-category-input"
              placeholder="Nome da categoria..."
              value={customCategoryInput}
              onChange={(e) => setCustomCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCustomModalConfirm();
                if (e.key === "Escape") handleCustomModalCancel();
              }}
              autoFocus
            />
            <div className="custom-category-modal-buttons">
              <button
                type="button"
                className="btn-primary"
                onClick={handleCustomModalCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleCustomModalConfirm}
                disabled={!customCategoryInput.trim()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header-div">
        <h1>Cadastrar Dúvida</h1>
        <p>Insira os detalhes da sua dúvida abaixo</p>
      </div>

      <div className="details-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <div className="cadastro-duvida-categoria-row">
              <select
                id="categoria"
                className="form-input"
                value={selectedCategory === "__outra__" ? "__outra__" : selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Selecione uma categoria...
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
                {selectedCategory === "__outra__" && customCategory && (
                  <option value="__outra__">Outra: {customCategory}</option>
                )}
              </select>
              <button
                type="button"
                className="btn-primary"
                style={{ whiteSpace: "nowrap", padding: "8px 16px", fontSize: "14px" }}
                onClick={() => setShowCustomModal(true)}
              >
                Outra Categoria
              </button>
            </div>
          </div>

          {showErrors && (
            <div className="cadastro-duvida-errors">
              <p className="cadastro-duvida-error-text">
                Por favor, preencha todos os campos.
              </p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              id="titulo"
              type="text"
              className="form-input"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              className="form-input"
              placeholder="Digite aqui a sua dúvida..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="actions-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!title && !description}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}

export default CadastroDuvidas;

