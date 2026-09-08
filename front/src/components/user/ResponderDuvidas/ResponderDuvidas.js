import React, { useState, useEffect } from "react";

import "../../global.css";

import { Link } from "react-router-dom";

import { allQuestion } from "../../../services/question.service";

import UserLayout from "../Layout/UserLayout";

import Modal from "../../modal/modal.js";

import {
  useDuvidasFilter,
  DuvidasFilter,
  DoubtCard,
} from "../shared/DuvidasShared";

const ResponderDuvidas = () => {
  const [duvidas, setDuvidas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const {
    filtroVisivel,
    filtro,
    search,
    filteredDoubts,
    toggleFiltroVisivel,
    handleFiltroChange,
    handleSearchChange,
    aplicarFiltro,
  } = useDuvidasFilter(duvidas);

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const response = await allQuestion();
        const data = await response.json();
        setDuvidas(data);
      } catch (err) {
        setError(err.message);

        setModal({
          isOpen: true,
          title: "Erro ao carregar dúvidas",
          message: "Erro ao carregar dúvidas: " + err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDuvidas();
  }, []);

  const handleCloseModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
    });
  };

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>{error}</div>;

  return (
    <UserLayout>
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
      >
        <div id="conteudo">
          <div className="icone-h1-container">
            <i className="bi bi-exclamation-circle"></i>

            <h1>{modal.title}</h1>
          </div>

          <p>{modal.message}</p>

          <div className="div-botoes">
            <button
              type="button"
              className="botao-azul"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <div className="header-div">
        <h1>Responder Dúvidas</h1>
        <p>Veja as dúvidas aguardando resposta</p>
      </div>

      <DuvidasFilter
        filtroVisivel={filtroVisivel}
        filtro={filtro}
        search={search}
        onToggle={toggleFiltroVisivel}
        onFiltroChange={handleFiltroChange}
        onSearchChange={handleSearchChange}
        onAplicar={aplicarFiltro}
      />

      <div className="doubt-list-shared">
        {filteredDoubts.filter((d) => d.status !== "answered").length > 0 ? (
          filteredDoubts
            .filter((d) => d.status !== "answered")
            .map((doubt) => (
              <DoubtCard
                key={doubt.id}
                doubt={doubt}
                showQuestioner
                actionSlot={
                  <Link
                    to={{
                      pathname: `/responder-duvidas/${doubt.id}`,
                    }}
                    state={{ doubt }}
                    className="btn-primary"
                    style={{
                      marginTop: "10px",
                      textDecoration: "none",
                      width: "fit-content",
                      padding: "8px 20px",
                      fontSize: "13px",
                    }}
                  >
                    Responder
                  </Link>
                }
              />
            ))
        ) : (
          <p>Nenhuma dúvida encontrada.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default ResponderDuvidas;