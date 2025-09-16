import React from "react";
import { useNavigate } from "react-router-dom";
import "./SobreNos.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import fotoprofile from "../../../utils/images/Vector.png";
import integrante1 from "../../../utils/images/integrante1.jpg";
import integrante2 from "../../../utils/images/integrante2.jpg";
import integrante3 from "../../../utils/images/integrante3.jpg";
import integrante4 from "../../../utils/images/integrante4.jpg";
import integrante5 from "../../../utils/images/integrante5.jpg";

const integrantes = [
  {
    nome: "Maria Eduarda Caldas Eloi",
    papel: "Gerente de Projetos, UX/UI, Desenvolvedora Front-End",
    foto: integrante1,
  },
  {
    nome: "João Pedro Rodrigues",
    papel: "Desenvolvedor Back-End",
    foto: integrante2,
  },
  {
    nome: "Gabriel Sena",
    papel: "Desenvolvedor Back-End",
    foto: integrante3,
  },
  {
    nome: "Maria Eduarda Gonçalves",
    papel: "Desenvolvedora Front-End",
    foto: integrante4,
  },
  {
    nome: "Ana Beatriz",
    papel: "Desenvolvedora Front-End",
    foto: integrante5,
  },
];

function SobreNos() {
  const navigate = useNavigate();

  return (
    <div className="fundo-gradiente">
      <header className="header-global">
        <nav className="header-global-nav">
          <a href="/" className="app-home-logo-link">
            <img
              src={tiraDuvidasLogo}
              alt="Tira Dúvidas Logo"
              className="logo-cadasroDuvidas"
            />
          </a>
          <a href="/" className="nav-bar-item">
            <i className="bi bi-house-door-fill"></i>Início
          </a>
          <a href="minhas-duvidas" className="nav-bar-item">
            <i className="bi bi-patch-question-fill"></i>Minhas dúvidas
          </a>

          <a href="/perfil" className="profile-btn">
            <img
              src={defaultProfilePic}
              alt="icon-profile"
              className="user-profile-img"
            />
          </a>
        </nav>
      </header>
      <main className="sobre-nos-main">
        <section className="sobre-nos-introducao">
          <h2>Sobre o Projeto Tira Dúvidas</h2>
          <p>
            O <strong>Tira Dúvidas</strong> é uma plataforma Web desenvolvida
            por alunos do grupo PET-Sistemas da UFMS com o objetivo de aproximar
            a comunidade – interna e externa à Universidade – do conhecimento em
            Tecnologias da Informação e Comunicação (TIC).
          </p>
          <p>
            A proposta é simples, acessível e colaborativa: qualquer pessoa pode
            enviar dúvidas relacionadas à área de TIC, e alunos da Faculdade de
            Computação (FACOM/UFMS), previamente aprovados como respondentes, se
            encarregam de respondê-las de forma clara e responsável.
          </p>
          <p>
            Além de promover o aprendizado coletivo, o sistema também
            possibilita a emissão de relatórios e certificados para os
            respondentes, integrando a ação ao projeto de extensão vinculado à
            universidade.
          </p>
          <p>
            O Tira-Dúvidas foi idealizado, planejado e desenvolvido do zero por
            estudantes do PET-Sistemas/UFMS, que assumiram as funções de
            análise, design, desenvolvimento e testes. Este projeto representa
            uma iniciativa concreta de extensão universitária, inovação social e
            formação prática de alunos de computação comprometidos com o
            compartilhamento do saber.
          </p>
        </section>

        <section className="sobre-nos-integrantes">
          <h3>Equipe</h3>
          <div className="integrantes-circulares">
            {integrantes.map((integrante, index) => (
              <div className="integrante-circular" key={index}>
                <img
                  src={integrante.foto}
                  alt={integrante.nome}
                  className="foto-circular"
                />
                <h4>{integrante.nome}</h4>
                <p>{integrante.papel}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer-scroll">
        <img src={logoUfms} alt="Logo UFMS" />
      </footer>
    </div>
  );
}

export default SobreNos;
