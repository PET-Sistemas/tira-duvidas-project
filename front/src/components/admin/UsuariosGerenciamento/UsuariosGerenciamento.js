import React from "react";
import AdminLayout from "../layout/AdminLayout"; 
import "../globalAdmin.css";
function UsuariosGerenciamento() {
  return (
    <AdminLayout>
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
            Filtrar
          </button>
        </div>

        <table className="user-table">
           <thead>
             <tr>
               <th>Nome</th>
               <th className="sortable">Data Criação <i class="bi bi-arrow-up"></i></th>
               <th class="sortable">Última Resposta <i class="bi bi-arrow-up"></i></th>
               <th>Status</th>
               <th>Tipo</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>Sofia Oliveira</td>
               <td>25/03/2024</td>
               <td>05/05/2025</td>
               <td>
                 <span class="status status-ativo">Ativo</span>
               </td>
               <td>
                 <button class="btn-tipo questionador">Questionador</button>
               </td>
             </tr>
           </tbody>
        </table>

        <div class="table-footer">
            <div class="pagination">
                <a href="#">&lt;</a>
                <a href="#" class="active">1</a>
                <a href="#">&gt;</a>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UsuariosGerenciamento;