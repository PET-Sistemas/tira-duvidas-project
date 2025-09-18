import React from "react";
import AdminLayout from "../layout/AdminLayout"; 

function CategoriasGerenciamento() {
  return (
    <AdminLayout>
      <header className="header-admin">
        <h1>Gerenciamento de Categorias</h1>
        <p>Adicione, edite ou remova categorias de perguntas.</p>
      </header>

      <div id="button">
        <button id="cadastrar-categoria-btn">Cadastrar categoria</button>
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
    </AdminLayout>
  );
}

export default CategoriasGerenciamento;