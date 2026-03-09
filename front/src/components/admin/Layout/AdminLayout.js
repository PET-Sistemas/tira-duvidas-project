import React from "react";
import "./AdminLayout.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";

function AdminLayout({ children }) {
  return (
    <div className="bodyAdmin">
      <main className="mainAdmin">
        <div className="logo-nav">
          <a href="/" className="tira-duvidas-logo">
            <img
              src={tiraDuvidasLogo}
              alt="Tira Dúvidas Logo"
              className="logo-cadasroDuvidas"
            />
          </a>
        </div>

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
