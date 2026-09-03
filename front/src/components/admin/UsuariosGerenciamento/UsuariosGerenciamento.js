import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import "../globalAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { allUser } from "../../../services/user.service";
import "./UsuariosGerenciamento.css";

function UsuariosGerenciamento() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("respondent");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allUser();
        if (Array.isArray(data)) setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const nome = user.name || user.user_name || "";
    const matchesRole = user.role === roleFilter;
    const matchesSearch = nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    const dateA = a[sortField] ? new Date(a[sortField]).getTime() : 0;
    const dateB = b[sortField] ? new Date(b[sortField]).getTime() : 0;

    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
  if (sortField === field) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortDirection("asc");
  }
  setCurrentPage(1);
};

const getSortIcon = (field) => {
  if (sortField !== field) return "bi-arrow-up";
  return sortDirection === "asc" ? "bi-arrow-up" : "bi-arrow-down";
};

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const statusMap = {
    active: {
      text: "Ativo",
      className: "bg-green white fbtn status center",
    },
    inactive: {
      text: "Inativo",
      className: "bg-red white fbtn status",
    },
  };

  const renderTableBody = () => {
    if (currentUsers.length === 0) {
      return (
        <tr>
          <td
            colSpan={roleFilter === "respondent" ? 4 : 3}
            className="center-text"
            style={{ padding: "20px" }}
          >
            Nenhum usuário encontrado.
          </td>
        </tr>
      );
    }

    return currentUsers.map((user) => {
      const statusDisplay = statusMap[user.status];
      return (
        <tr key={user.id}>
          <td id="nome" data-label="Nome">
            <Link to={`/admin/usuarios/${user.id}`} className="user-name">
              {user.name}
            </Link>
          </td>
          <td data-label="Data Criação">
            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
          </td>

          {roleFilter === "respondent" && (
            <td data-label="Última Resposta">
              {user.lastResponse
                ? new Date(user.lastResponse).toLocaleDateString("pt-BR")
                : "-"}
            </td>
          )}
          <td data-label="Status">
            <span className={`${statusDisplay.className}`}>
              {statusDisplay.text}
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <AdminLayout>
      <div className="header-div">
        <h1>Gerenciamento de Usuários</h1>
        <p>Informações do usuário e ações administrativas</p>
      </div>

      <div className="search-field">
        <div className="search-wrapper">
          <i className="bi bi-search search-icon"></i>
          <input
            type="search"
            id="search-input"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="role-filter-controls" aria-label="Filtrar usuários por tipo">
          <button
            type="button"
            className={`role-filter-btn ${
              roleFilter === "respondent" ? "active" : ""
            }`}
            aria-pressed={roleFilter === "respondent"}
            onClick={() => handleRoleFilter("respondent")}
          >
            Respondentes
          </button>
          <button
            type="button"
            className={`role-filter-btn ${
              roleFilter === "questioner" ? "active" : ""
            }`}
            aria-pressed={roleFilter === "questioner"}
            onClick={() => handleRoleFilter("questioner")}
          >
            Questionadores
          </button>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th id="nome">
              <span>Nome</span>
            </th>
            <th
              className="sortable"
              onClick={() => handleSort("createdAt")}
              style={{ cursor: "pointer" }}
            >
              <span className="center">
                Data Criação{" "}
                <i className={`bi ${getSortIcon("createdAt")}`}></i>
              </span>{" "}
            </th>
            {roleFilter === "respondent" && (
              <th
                className="sortable"
                onClick={() => handleSort("lastResponse")}
                style={{ cursor: "pointer" }}
              >
                <span className="center">
                  Última Resposta{" "}
                  <i className={`bi ${getSortIcon("lastResponse")}`}></i>
                </span>
              </th>
            )}
            <th>
              <span className="center">Status</span>
            </th>
          </tr>
        </thead>

        <tbody>{renderTableBody()}</tbody>
      </table>

      {totalPages > 0 && (
        <div className="table-footer">
          <div className="pagination">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="page-link-"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`page-link-${currentPage === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={"page-link-"}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default UsuariosGerenciamento;
