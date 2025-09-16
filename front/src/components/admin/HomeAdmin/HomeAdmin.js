import React, { useEffect, useState } from "react";
import "../globalAdmin.css";
import styles from "./homeAdmin.module.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";

function HomeAdmin() {
  return (
      <div className="homeAdmin">
        <div className="fundoAdmin">
          <main className="mainAdmin">
            <nav className="navAdmin">
              <div class="links-nav">
                <a href="/admin">
                  <i class="bi bi-people"></i>
                  Home
                </a>
                <a href="/admin/usuarios">
                  <i class="bi bi-people"></i>
                  Usuários
                </a>
                <a href="/admin/categorias">
                  <i class="bi bi-list-nested"></i>
                  Categorias
                </a>
                <a>
                  <i class="bi bi-file-earmark-bar-graph"></i>
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
            <div className='fundo-container-admin'>
              <div className={styles['fundo-content-admin']}>
                <h1>Bem-vindo ao Painel de Admin!</h1>
                <p>Equipe PET Tira Dúvidas.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}

export default HomeAdmin;
