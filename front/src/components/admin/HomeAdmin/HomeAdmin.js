import React from "react";
import AdminLayout from "../Layout/AdminLayout";
import { NavLink, useNavigate } from "react-router-dom";

function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <h1>Bem-vindo ao Painel de Admin!</h1>
      <p>Equipe PET Tira Dúvidas.</p>

      <div className="cards">
        <div onClick={() => navigate("/admin/usuarios")} className="card">
          <i className="bi bi-people"></i>
          Usuários
        </div>
        <div onClick={() => navigate("/admin/relatorios")} className="card">
          <i className="bi bi-file-earmark-bar-graph"></i>
          Relatórios
        </div>
      </div>
    </AdminLayout>
  );
}

export default HomeAdmin;
