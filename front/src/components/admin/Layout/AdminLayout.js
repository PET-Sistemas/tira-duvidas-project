import React from "react";
import "./AdminLayout.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import logoUfms from "../../../utils/images/logo-ufms.png";

function AdminLayout({ children }) {
  return (
    <main className="mainAdmin">
      <header className="header">
        <a href="/" className="logo-link">
            <img
                src={tiraDuvidasLogo}
                alt="Tira Dúvidas Logo"
                className="logo-cadasroDuvidas"
            />
        </a>
      </header>

      {/*area de conteudo principal */}
        <div className="fundo-content-admin">
          {/*'children' renderiza o conteudo especifico da pagina*/}
          {children}

          <footer>
            <img src={logoUfms} alt="Logo UFMS"/>
          </footer>
        </div>
    </main>
  );
}

export default AdminLayout;
