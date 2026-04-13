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
    const value = e.target.value;
    if (value === "__outra__") {
      setShowCustomModal(true);
    } else {
      setSelectedCategory(value);
      setCustomCategory("");
    }
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

  const categoryLabel =
    selectedCategory === "__outra__" && customCategory
      ? `Outra: ${customCategory}`
      : null;

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
                className="custom-category-btn-cancel"
                onClick={handleCustomModalCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="custom-category-btn-confirm"
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

      <div className="cadastro-duvida-form">
        <form className="cadastro-duvida-form" onSubmit={handleSubmit}>
          <div className="cadastro-duvida-form-group">
            <label className="cadastro-duvida-label" htmlFor="categoria">
              Categoria:
            </label>
            <select
              id="categoria"
              className="cadastro-duvida-input"
              value={selectedCategory}
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
              <option value="__outra__">
                {categoryLabel ? categoryLabel : "Outra..."}
              </option>
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
      </div>
    </UserLayout>
  );
}

export default CadastroDuvidas;

