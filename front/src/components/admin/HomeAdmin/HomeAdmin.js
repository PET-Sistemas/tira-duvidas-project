import React from "react";
import AdminLayout from "../Layout/AdminLayout";
import { NavLink, useNavigate } from "react-router-dom";
import imgCard1 from "../../../utils/images/file-earmark-bar-graph.svg";
import imgCard2 from "../../../utils/images/people.svg";

function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <h1>Bem-vindo ao Painel de Admin!</h1>
      <p>Equipe PET Tira Dúvidas.</p>

      <div className="cards">
        <div onClick={() => navigate("/admin/usuarios")} className="card">
          <img src={imgCard2} alt="Usuários" className="card-img-admin" />
          <span className="card-title">Usuários</span>
        </div>
        <div onClick={() => navigate("/admin/relatorios")} className="card">
          <img src={imgCard1} alt="Relatórios" className="card-img-admin" />
          <span className="card-title">Relatórios</span> 
        </div>
      </div>
    </AdminLayout>
  );
}

export default HomeAdmin;
