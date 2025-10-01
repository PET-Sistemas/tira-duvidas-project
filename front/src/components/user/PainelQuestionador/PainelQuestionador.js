import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelQuestionador.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import fotoprofile from "../../../utils/images/Vector.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import logoUfms from "../../../utils/images/logo-ufms.png";
import imgCard1 from "../../../utils/images/MinhasDuvidas.png";
import imgCard2 from "../../../utils/images/DadosPessoais.png";
import UserLayout from "../Layout/UserLayout";

function PainelQuestionador() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
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
      <main className="painel-questionador-main">
        <h1 className="painel-titulo">Painel de Questionador</h1>

        <div className="cards">
          <div
            className="card"
            onClick={() => navigate("/minhas-duvidas")}
          >
            <img
              src={imgCard1}
              alt="Minhas Dúvidas"
              className="card-img"
            />
            <span className="card-title">
              Minhas Dúvidas
            </span>
          </div>

          <div
            className="card"
            onClick={() => navigate("/perfil")}
          >
            <img
              src={imgCard2}
              alt="Meus Dados Pessoais"
              className="card-img"
            />
            <span className="card-title">
              Meus Dados Pessoais
            </span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </main>
    </UserLayout>
  );
}

export default PainelQuestionador;
