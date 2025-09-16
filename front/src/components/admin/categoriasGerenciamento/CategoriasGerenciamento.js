import React, { useEffect, useState } from "react";
import "../globalAdmin.css";
import "./categoriasGerenciamento.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";

function UsuariosGerenciamento() {
  return (
    <body>
      <div className="homeAdmin">
        <div className="bodyAdmin">
          <main className="mainAdmin">
            <nav className="navAdmin">
              <div class="links-nav">
                <a href="#">
                  <i class="bi bi-people"></i>
                  Usuários
                </a>
                <a href="#">
                  <i class="bi bi-list-nested"></i>
                  Categorias
                </a>
                <a href="#">
                  <i class="bi bi-file-earmark-bar-graph"></i>
                  Relatórios
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
                  <button id="cadastrar-categoria-btn">
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
                          <i class="bi bi-trash"></i>EXCLUIR
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
