import React, { useEffect, useState } from "react";

import "./CadastroDuvidas.css";
import "../../global.css";

import { createQuestion } from "../../../services/question.service";
import { allCategory } from "../../../services/category.service";

import { useNavigate } from "react-router-dom";

import UserLayout from "../Layout/UserLayout";

import Modal from "../../modal/modal.js";
import "../../modal/modal.css";

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

  // Estado do modal de mensagens
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

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

  // Fecha o modal de mensagem
  const handleCloseModal = () => {
    const wasSuccess = modal.type === "success";

    setModal({
      isOpen: false,
      type: "",
      title: "",
      message: "",
    });

    // Após fechar o modal de sucesso, volta para a tela inicial
    if (wasSuccess) {
      navigate("/");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription || !selectedCategory) {
      setShowErrors(true);


      setModal({
        isOpen: true,
        type: "error",
        title: "Campos obrigatórios",
        message: "Por favor, preencha todos os campos.",
      });

      return;
    }

    setShowErrors(false);


      return;
    }
    setShowErrors(false);

    const questionerId = Number(sessionStorage.getItem("id"));
    const status = "not_answered";

    const isCustom =
      selectedCategory === "__outra__" && customCategory;

    const newQuestion = {
      title: trimmedTitle,
      description: trimmedDescription,
      questionerId,
      status,
      ...(isCustom
        ? {
            categories: [],
            customCategory,
          }
        : {
            categories: [selectedCategory],
          }),
    };

    try {
      const response = await createQuestion(newQuestion);

      if (!response.ok) {
        throw new Error("Erro ao cadastrar dúvida");
      }

      setTitle("");
      setSelectedCategory("");
      setDescription("");
      setCustomCategory("");

      setModal({
        isOpen: true,
        type: "success",
        title: "Dúvida cadastrada!",
        message: "Sua dúvida foi cadastrada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao cadastrar dúvida:", error);

      setModal({
        isOpen: true,
        type: "error",
        title: "Erro",
        message:
          "Não foi possível cadastrar a dúvida. Tente novamente.",
      });
    }
  };

  return (
    <UserLayout>

      {/* Modal de mensagens */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
      >
        <div
          id={
            modal.type === "success"
              ? "sucesso"
              : "conteudo"
          }
        >
          <div className="icone-h1-container">

            {modal.type === "success" ? (
              <i className="bi bi-check-circle modal-icon-success"></i>
            ) : (
              <i className="bi bi-exclamation-circle modal-icon-danger"></i>
            )}

            <h1 className="modal-title">
              {modal.title}
            </h1>

            <p className="modal-text">
              {modal.message}
            </p>

          </div>

          <div className="div-botoes">
            <button
              type="button"
              className="btn-action btn-secondary"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para categoria personalizada */}
      {showCustomModal && (
        <div className="custom-category-overlay">
          <div className="custom-category-modal">

            <h3>Categoria personalizada</h3>

            <p>
              Digite o nome da categoria para esta dúvida:
            </p>

            <input
              type="text"
              className="custom-category-input"
              placeholder="Nome da categoria..."
              value={customCategoryInput}
              onChange={(e) =>
                setCustomCategoryInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCustomModalConfirm();
                }

                if (e.key === "Escape") {
                  handleCustomModalCancel();
                }
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

        <p>
          Insira os detalhes da sua dúvida abaixo
        </p>
      </div>

      <div className="details-form-wrapper">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="categoria">
              Categoria:
            </label>

            <div className="cadastro-duvida-categoria-row">

              <select
                id="categoria"
                className="form-input"
                value={
                  selectedCategory === "__outra__"
                    ? "__outra__"
                    : selectedCategory
                }
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Selecione uma categoria...
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}

                {selectedCategory === "__outra__" &&
                  customCategory && (
                    <option value="__outra__">
                      Outra: {customCategory}
                    </option>
                  )}
              </select>

              <button
                type="button"
                className="btn-primary"
                style={{
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
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
            <label htmlFor="titulo">
              Título:
            </label>

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
            <label htmlFor="descricao">
              Descrição:
            </label>

            <textarea
              id="descricao"
              className="form-input"
              placeholder="Digite aqui a sua dúvida..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
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
              disabled={
                !title.trim() ||
                !description.trim() ||
                !selectedCategory
              }

              disabled={!title.trim() || !description.trim() || !selectedCategory}

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