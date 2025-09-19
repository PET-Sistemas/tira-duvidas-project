import React, { useEffect, useState } from "react";
import "../globalAdmin.css";
import "./categoriasGerenciamento.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import Modal from "../../modal/modal.js";

function UsuariosGerenciamento() {
  const [modalCadastrar, setmodalCadastrar] = useState(false);
  const [modalExcluir, setmodalExcluir] = useState(false);
  const [modalEditar, setmodalEditar] = useState(false);

  if (modalCadastrar || modalExcluir || modalEditar) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <body>
      <Modal
        isOpen={modalCadastrar}
        onClose={() => setmodalCadastrar(false)}
        title="Nova Categoria"
      >
        <div className="div-form">
          <label for="titulo" className={"required"}>
            Digite o título da nova categoria
          </label>
          <input id="titulo"></input>
          <label for="descricao">Descrição</label>
          <textarea id="descricao"></textarea>
        </div>
        <button className="botao-branco">Cadastrar</button>
      </Modal>

      <Modal
        isOpen={modalExcluir}
        onClose={() => setmodalExcluir(false)}
        title="Tem certeza que deseja remover essa categoria?"
      >
        <div className="div-botoes">
          <button className="botao-branco">Cancelar</button>
          <button className="botao-azul">Remover</button>
        </div>
      </Modal>

      <Modal
        isOpen={modalEditar}
        onClose={() => setmodalEditar(false)}
        title="Editar Categoria"
      >
        <div className="div-form">
          <label for="titulo" className={"required"}>
            Digite o título da nova categoria
          </label>
          <input id="titulo"></input>
          <label for="descricao">Descrição</label>
          <textarea id="descricao"></textarea>
        </div>
        <button className="botao-branco">Editar</button>
      </Modal>
      <div className="homeAdmin">
        <div className="bodyAdmin">
          <main className="mainAdmin">
            <nav className="navAdmin">
              <div class="links-nav">
                <a href="/admin">
                  <i class="bi bi-people"></i>
                  Home
                </a>
                <a href="/admin/usuarios">
                  <i class="bi bi-people"></i>
                  Usuários
                </a>
                <a href="/admin/categorias">
                  <i class="bi bi-list-nested"></i>
                  Categorias
                </a>
                <a>
                  <i class="bi bi-file-earmark-bar-graph"></i>
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
                          Data Criação <i class="bi bi-arrow-up"></i>
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
                            <i class="bi bi-trash"></i>
                            <p style={{ color: "red" }}>EXCLUIR</p>
                          </button>
                          <button
                            onClick={() => setmodalEditar(true)}
                            className={"btn-modal-editar"}
                          >
                            <i class="bi bi-pencil"></i>
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
