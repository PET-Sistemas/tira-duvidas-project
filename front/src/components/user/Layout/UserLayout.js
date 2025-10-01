import React, { useEffect, useState } from "react";
import "./UserLayout.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function UserLayout({ children }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Verifica se há um username armazenado no sessionStorage
        const storedUsername = sessionStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="bodyUser">
            <main className="mainUser">
                <header className="header">
                    <div className="items-header">
                        <a href="/" className="logo-link">
                            <img
                                src={tiraDuvidasLogo}
                                alt="Tira Dúvidas Logo"
                                className="logo-cadasroDuvidas"
                            />
                        </a>

                        <a href="/" className="sobre-nav-link">
                            <i className="bi bi-house-door-fill"></i>Início
                        </a>

                        <a href="/duvidas" className="sobre-nav-link">
                            <i className="bi bi-patch-question-fill"></i>Dúvidas
                        </a>
                        
                        <a href="/minhas-duvidas" className="sobre-nav-link">
                            <i class="bi bi-person-fill"></i>Minhas dúvidas
                        </a>

                        <a href="/sobrenos" className="sobre-nav-link">
                            <i class="bi bi-info-circle-fill"></i>Sobre nós
                        </a>
                    </div>
                <nav className="nav">
                    {username ? (
                        // Exibe o nome do usuário se estiver logado
                        <div className="user-info">
                            <button className="btn-profile" onClick={() => {
                                if(sessionStorage.getItem("role") === "questioner")
                                    navigate("/painel-questionador");
                                else if(sessionStorage.getItem("role") === "respondent")
                                    navigate("/painel-respondente");
                            }}>
                            <img
                                src={defaultProfilePic}
                                alt="Foto de perfil"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            </button>
                            <span className="username">Olá, {username}!</span>
                        </div>
                    ) : (
                        // Exibe os botões de login e cadastro se o usuário não estiver logado
                        <>
                            <button className="btn-login" onClick={() => navigate("/login")}>
                                Entrar
                            </button>
                            <button className="btn-signup" onClick={() => navigate("/signup")}>
                                Cadastrar-se
                            </button>
                        </>
                    )}
                </nav>
            </header>

            {/*area de conteudo principal */}
            <div className="fundo-content-user">
                {/*'children' renderiza o conteudo especifico da pagina*/}
                {children}

                <footer>
                    <img src={logoUfms} alt="Logo UFMS" />
                </footer>
            </div>
        </main>
    </div>
    );
}

export default UserLayout;
