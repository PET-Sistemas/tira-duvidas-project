import React, { useState, useEffect } from 'react';import AdminLayout from "../layout/AdminLayout"; 
import "../globalAdmin.css";
import { Link } from 'react-router-dom';
import { allUser} from "../../../services/user.service";
import "./UsuariosGerenciamento.css"

function UsuariosGerenciamento() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allUser(); // Chama a função do seu serviço
        console.log(data)
        setUsers(data); // Guarda os usuários no estado
      } catch (err) {
        setError(err.message); // Guarda qualquer erro
      } finally {
        setLoading(false); // Para de carregar (mesmo com erro)
      }
    };

    fetchUsers();
  }, []);

  const statusMap = {
  active: { text: 'Ativo', className: 'btn btn-success w-50 h-15 p-1 btn-disabled' },  
  inactive: { text: 'Inativo', className: 'btn btn-danger w-50 h-50 btn-disabled' },
  };

  const roleMap = {
  questioner: { text: 'Questionador', className: 'btn btn-primary w-100 h-50' },
  respondent: { text: 'Respondente', className: 'btn btn-primary w-100 h-50' },
  admin: { text: 'Admin', className: 'btn btn-primary w-100 h-50' },
  };

  const renderTableBody = () => {

    return users.map((user) => {

      const statusDisplay = statusMap[user.status];
      const roleDisplay = roleMap[user.role];

      return (
      <tr key={user.id}>
        <td>
          <Link to={`/admin/usuarios/${user.id}`}>
            {user.name}
          </Link>
        </td>
        <td>
          {new Date(user.createdAt).toLocaleDateString()}
        </td>
        
        <td>
        </td> 
        <td>
            <button className={`${statusDisplay.className}`} >
              {statusDisplay.text}
            </button>
          </td>
          <td>
            <button className={`${roleDisplay.className}`} >
              {roleDisplay.text}
            </button>
        </td>
      </tr>
    )});
  };

  return (<AdminLayout>
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
              <th className="sortable">Data Criação <i className="bi bi-arrow-up"></i></th>
              <th className="sortable">Última Resposta <i className="bi bi-arrow-up"></i></th>
              <th>Status</th>
              <th>Tipo</th>
            </tr>
          </thead>
          
          {/* AQUI ESTÁ A MUDANÇA PRINCIPAL */}
          <tbody>
            {renderTableBody()}
          </tbody>

        </table>

        <div className="table-footer">
          <div className="pagination">
            <a href="#">&lt;</a>
            <a href="#" className="active">1</a>
            <a href="#">&gt;</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UsuariosGerenciamento;