import React from "react";
import AdminLayout from "../Layout/AdminLayout";
import styles from "./homeAdmin.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function HomeAdmin() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AdminLayout>
      <h1>Bem-vindo ao Painel de Admin!</h1>
      <p>Equipe PET Tira Dúvidas.</p>

      <div className="admin-home-nav">
        <NavLink to="/admin/usuarios" className="admin-home-link">
          <i className="bi bi-people"></i>
          Usuários
        </NavLink>
        <NavLink to="/admin/relatorios" className="admin-home-link">
          <i className="bi bi-file-earmark-bar-graph"></i>
          Relatórios
        </NavLink>
      </div>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </AdminLayout>
  );
}

export default HomeAdmin;
