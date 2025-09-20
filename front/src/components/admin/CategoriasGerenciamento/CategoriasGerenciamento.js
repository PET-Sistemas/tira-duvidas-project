import React, { useEffect, useState } from "react";
import "../globalAdmin.css";
import "./categoriasGerenciamento.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import Modal from "../../modal/modal.js";

function UsuariosGerenciamento() {
  const [modalCadastrar, setmodalCadastrar] = useState(false);
  const [modalExcluir, setmodalExcluir] = useState(false);
  const [modalEditar, setmodalEditar] = useState(false);

  const [modalCadastrarSucesso, setmodalCadastrarSucesso] = useState(false);
  const [modalExcluirSucesso, setmodalExcluirSucesso] = useState(false);
  const [modalEditarSucesso, setmodalEditarSucesso] = useState(false);

  if (modalCadastrar || modalExcluir || modalEditar) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <body>
      <Modal isOpen={modalCadastrar} onClose={() => setmodalCadastrar(false)}>
        <div id={"conteudo"}>
          <div className={"icone-h1-container"}>
            <h1>Nova Categoria</h1>
          </div>
          <div className="div-form">
            <label htmlFor={"titulo"} className={"required"}>
              Digite o título da nova categoria
            </label>
            <input id="titulo"></input>
            <label htmlFor={"descricao"}>Descrição</label>
            <textarea id="descricao"></textarea>
          </div>

          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalCadastrar(false)}
            >
              Fechar
            </button>
            <button
              className="botao-azul"
              onClick={() => {
                setmodalCadastrarSucesso(true);
                setmodalCadastrar(false);
              }}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalCadastrarSucesso}
        onClose={() => setmodalCadastrarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className="bi bi-check-circle"></i>
            <h1 style={{ display: "inline" }}>Categoria criada com sucesso</h1>
          </div>
          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalCadastrarSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalExcluir} onClose={() => setmodalExcluir(false)}>
        <div id={"conteudo"}>
          <div className={"icone-h1-container"}>
            <h1>Tem certeza que deseja remover essa categoria?</h1>
          </div>
          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalExcluir(false)}
            >
              Cancelar
            </button>
            <button
              className="botao-azul"
              onClick={() => {
                setmodalExcluir(false);
                setmodalExcluirSucesso(true);
              }}
            >
              Remover
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalExcluirSucesso}
        onClose={() => setmodalExcluirSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className="bi bi-trash-fill"></i>
            <h1 style={{ display: "inline" }}>Categoria removida</h1>
          </div>
          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalExcluirSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalEditar} onClose={() => setmodalEditar(false)}>
        <div id={"conteudo"}>
          <div className={"icone-h1-container"}>
            <h1>Editar Categoria</h1>
          </div>
          <div className="div-form">
            <label htmlFor={"titulo"} className={"required"}>
              Digite o título da nova categoria
            </label>
            <input id="titulo"></input>
            <label htmlFor={"descricao"}>Descrição</label>
            <textarea id="descricao"></textarea>
          </div>
          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalEditar(false)}
            >
              Cancelar
            </button>
            <button
              className="botao-azul"
              onClick={() => {
                setmodalEditar(false);
                setmodalEditarSucesso(true);
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalEditarSucesso}
        onClose={() => setmodalEditarSucesso(false)}
      >
        <div id={"sucesso"}>
          <div className={"icone-h1-container"}>
            <i className="bi bi-check-circle"></i>
            <h1 style={{ display: "inline" }}>Categoria editada com sucesso</h1>
          </div>
          <div className="div-botoes">
            <button
              className="botao-branco"
              onClick={() => setmodalEditarSucesso(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <div className="homeAdmin">
        <div className="bodyAdmin">
          <main className="mainAdmin">
            <nav className="navAdmin">
              <div className="links-nav">
                <a href="/admin">
                  <i className="bi bi-people"></i>
                  Home
                </a>
                <a href="/admin/usuarios">
                  <i className="bi bi-people"></i>
                  Usuários
                </a>
                <a href="/admin/categorias">
                  <i className="bi bi-list-nested"></i>
                  Categorias
                </a>
                <a>
                  <i className="bi bi-file-earmark-bar-graph"></i>
                  Relatórios (Em breve)
                </a>
              </div>
              <div className="logo-nav">
                <a href="/" className="tira-duvidas-logo">
                  <img
                    src={tiraDuvidasLogo}
                    alt="Tira Dúvidas Logo"
                    className="logo-cadasroDuvidas"
                  />
                </a>
              </div>
            </nav>
            <section className="fundo-container-admin">
              <div className="fundo-content-admin">
                <header className="header-admin">
                  <h1>Gerenciamento de Categorias</h1>
                  <p>Informações do usuário e ações administrativas</p>
                </header>

                <div id="button">
                  <button
                    id="cadastrar-categoria-btn"
                    onClick={() => setmodalCadastrar(true)}
                  >
                    Cadastrar categoria
                  </button>
                </div>

                <div className="table-admin">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th className="sortable">
                          Data Criação <i className="bi bi-arrow-up"></i>
                        </th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody id="user-table-body">
                      <tr>
                        <td>Projetos</td>
                        <td>25/03/2024</td>
                        <td id="excluir">
                          <button
                            onClick={() => setmodalExcluir(true)}
                            className={"btn-modal-excluir"}
                          >
                            <i className="bi bi-trash"></i>
                            <p style={{ color: "red" }}>EXCLUIR</p>
                          </button>
                          <button
                            onClick={() => setmodalEditar(true)}
                            className={"btn-modal-editar"}
                          >
                            <i className="bi bi-pencil"></i>
                            <p style={{ color: "orangered" }}>EDITAR</p>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <div className="pagination">
                      <a href="#">&lt;</a>
                      <a href="#" className="active">
                        1
                      </a>
                      <a href="#">&gt;</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </body>
  );
}

export default UsuariosGerenciamento;
