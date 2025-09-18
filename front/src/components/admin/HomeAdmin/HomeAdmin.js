import React from "react";
import AdminLayout from "../layout/AdminLayout";
import styles from "./homeAdmin.module.css";

function HomeAdmin() {
  return (
    <AdminLayout>
      <div className={styles["home-content"]}>
        <h1>Bem-vindo ao Painel de Admin!</h1>
        <p>Equipe PET Tira Dúvidas.</p>
      </div>
    </AdminLayout>
  );
}

export default HomeAdmin;
