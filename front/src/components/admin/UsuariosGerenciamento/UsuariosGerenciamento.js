import React, { useState, useEffect } from 'react';import AdminLayout from "../layout/AdminLayout"; 
import "../globalAdmin.css";
import { Link } from 'react-router-dom';
import { allUser} from "../../../services/user.service";
import "./UsuariosGerenciamento.css"

function UsuariosGerenciamento() {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allUser();
        if(data && data.length > 0) setUsers(data); 
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {

    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const statusMap = {
  active: { text: 'Ativo', className: 'bg-green white padding-3 fbtn status center' },  
  inactive: { text: 'Inativo', className: 'bg-red white padding-3 fbtn status' },
  };

  const roleMap = {
  questioner: { text: 'Questionador', className: 'fbtn padding-3 blue borda bg-white tipo' },
  respondent: { text: 'Respondente', className: 'fbtn padding-3 white borda bg-blue tipo' },
  admin: { text: 'Admin', className: 'fbtn padding-3 blue borda bg-white tipo' },
  };

  const renderTableBody = () => {

    return currentUsers.map((user) => {

      const statusDisplay = statusMap[user.status];
      const roleDisplay = roleMap[user.role];

      return (
      <tr key={user.id}>
        <td id="nome" >
          <Link to={`/admin/usuarios/${user.id}`} className='user-name'>
            {user.name}
          </Link>
        </td>
        <td>
          {new Date(user.createdAt).toLocaleDateString('pt-BR')} 
       </td>
        
        <td>
          {user.lastResponse ? new Date(user.lastResponse).toLocaleDateString('pt-BR') : '-'}
        </td> 
        <td>
            <span className={`${statusDisplay.className}`} >
              {statusDisplay.text}
            </span>
          </td>
          <td>
            <span className={`${roleDisplay.className}`} >
              {roleDisplay.text}
            </span>
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
              <th id="nome">
                <span>
                  Nome
                </span>              
              </th>
              <th className="sortable">
                <span className="center">
                  Data Criação <i className="bi bi-arrow-up"></i>
                </span>              </th>
              <th className="sortable">
                <span className="center">
                  Última Resposta <i className="bi bi-arrow-up"></i>
                </span>
              </th>
              <th>
                <span className="center">
                  Status
                </span>
              </th>
              <th >
                <span className="center">
                  Tipo
                </span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {renderTableBody()}
          </tbody>

        </table>
<div className="table-footer">
            <div className="pagination">
              
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className='page-link-'
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={ `page-link-${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}

              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={'page-link-'}
              >
                &gt;
              </button>

            </div>
          </div>
      </div>
    </AdminLayout>
  );
}

export default UsuariosGerenciamento;