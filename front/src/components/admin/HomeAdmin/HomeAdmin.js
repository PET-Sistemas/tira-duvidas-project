import React from "react";
import AdminLayout from "../layout/AdminLayout";
import styles from "./homeAdmin.module.css";
import { useNavigate } from "react-router-dom";

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
      </div>
      <div>
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
