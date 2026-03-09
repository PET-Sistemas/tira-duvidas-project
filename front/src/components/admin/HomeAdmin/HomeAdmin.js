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
      <div className={styles["home-content"]}>
        <h1>Bem-vindo ao Painel de Admin!</h1>
        <p>Equipe PET Tira Dúvidas.</p>

        <div className={styles["admin-home-nav"]}>
          <NavLink to="/admin/usuarios" className={styles["admin-home-link"]}>
            <i className="bi bi-people"></i>
            Usuários
          </NavLink>
          <NavLink to="/admin/relatorios" className={styles["admin-home-link"]}>
            <i className="bi bi-file-earmark-bar-graph"></i>
            Relatórios
          </NavLink>
        </div>

      </div>
      <div className={styles["logout-wrapper"]}>
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </AdminLayout>
  );
}

export default HomeAdmin;
