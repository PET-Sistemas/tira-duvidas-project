import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelRespondente.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import imgCard1 from "../../../utils/images/DuvidasRespondidas.png";
import imgCard2 from "../../../utils/images/ResponderDuvidas.png";
import imgCard3 from "../../../utils/images/MinhasDuvidas.png";
import imgCard4 from "../../../utils/images/DadosPessoais.png";
import UserLayout from "../Layout/UserLayout";

function PainelRespondente() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <UserLayout>
      <main className="painel-main">
        <h1 className="painel-titulo">Painel do Usuário</h1>

        <div className="cards">
          <a href="/duvidas-respondidas" className="card">
            <img
              src={imgCard1}
              alt="Dúvidas Respondidas"
              className="card-img"
            />
            <span className="card-title">Dúvidas Respondidas</span>
          </a>

          <a href="/responder-duvidas" className="card">
            <img src={imgCard2} alt="Responder Dúvidas" className="card-img" />
            <span className="card-title">Responder Dúvidas</span>
          </a>

          <a href="/minhas-duvidas" className="card">
            <img src={imgCard3} alt="Minhas Dúvidas" className="card-img" />
            <span className="card-title">Minhas Dúvidas</span>
          </a>

          <a href="/perfil" className="card">
            <img
              src={imgCard4}
              alt="Meus Dados Pessoais"
              className="card-img"
            />
            <span className="card-title">Meus Dados Pessoais</span>
          </a>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </main>

    </UserLayout>
  );
}

export default PainelRespondente;
