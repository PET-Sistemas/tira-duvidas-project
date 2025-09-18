import React from "react";
import "./AdminLayout.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import { NavLink } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="bodyAdmin">
      <main className="mainAdmin">
        <nav className="navAdmin">
          <div className="links-nav">
            <NavLink to="/admin" end>
              <i className="bi bi-house-door"></i>
              Home
            </NavLink>
            <NavLink to="/admin/usuarios">
              <i className="bi bi-people"></i>
              Usuários
            </NavLink>
            <NavLink to="/admin/categorias">
              <i className="bi bi-list-nested"></i>
              Categorias
            </NavLink>
            <a href="#">
              <i className="bi bi-file-earmark-bar-graph"></i>
              Relatórios (Em breve)
            </a>
          </div>
          <div className="logo-nav">
            <a href="/" className="tira-duvidas-logo">
              <img
                src={tiraDuvidasLogo}
                alt="Tira Dúvidas Logo"
                className="logo-cadasroDuvidas"
              />
            </a>
          </div>
        </nav>

        {/*area de conteudo principal */}
        <section className="fundo-container-admin">
          <div className="fundo-content-admin">
            {/*'children' renderiza o conteudo especifico da pagina*/}
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;
