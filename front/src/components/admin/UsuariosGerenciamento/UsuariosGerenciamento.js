import React, { useEffect, useState } from "react";
import "../globalAdmin.css";
import "./UsuariosGerenciamento.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import FilterIcon from "../../../utils/images/filtrar.png";

function UsuariosGerenciamento() {
  return (
    <body>
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
                  <h1>Gerenciamento de Usuários</h1>
                  <p>Informações do usuário e ações administrativas</p>
                </header>

                <div className="table-admin">
                  <div className="search-field">
                    <input
                      type="search"
                      id="search-input"
                      placeholder="Pesquisar..."
                    />
                    <button className="filtrar-button">
                      <img
                        src={FilterIcon}
                        alt="Filter Icon"
                      />
                      Filtrar
                    </button>
                  </div>

                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th className="sortable">
                          Data Criação <i class="bi bi-arrow-up"></i>
                        </th>
                        <th class="sortable">
                          Última Resposta <i class="bi bi-arrow-up"></i>
                        </th>
                        <th>Status</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody id="user-table-body">
                      <tr>
                        <td>Sofia Oliveira</td>
                        <td>25/03/2024</td>
                        <td>05/05/2025</td>
                        <td>
                          <span class="status status-ativo">Ativo</span>
                        </td>
                        <td>
                          <button class="btn-tipo questionador">
                            Questionador
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="table-footer">
                    <div class="pagination">
                      <a href="#">&lt;</a>
                      <a href="#" class="active">
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
