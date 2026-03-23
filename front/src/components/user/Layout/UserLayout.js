import React, { useEffect, useState } from "react";
import "./UserLayout.css";
import "../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
function UserLayout({ children }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // Novo estado para o email
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do dropdown

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("username");
        const storedEmail = sessionStorage.getItem("email"); // Supondo que você salve o email no login
        if (storedUsername) {
            setUsername(storedUsername);
            setEmail(storedEmail || "usuario@gmail.com"); 
        }
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="bodyUser">
            <main className="mainUser">
                <header className="header">
                    <div className="items-header">
                        <a href="/" className="logo-link">
                            <img src={tiraDuvidasLogo} alt="Logo" className="logo-cadasroDuvidas" />
                        </a>
                        <a href="/sobrenos" className="sobre-nav-link">
                            <i className="bi bi-info-circle-fill"></i>Sobre nós
                        </a>
                    </div>

                    <nav className="nav">
                        {username ? (
                            <div className="user-container"> {/* Container relativo */}
                                <div className="user-info" onClick={toggleMenu} style={{cursor: 'pointer'}}>
                                    <button className="btn-profile">
                                        <img src={defaultProfilePic} alt="Perfil" className="profile-img-nav" />
                                    </button>
                                    <span className="username">Olá, {username}</span>
                                </div>

                                {/* O Card de Informações (Dropdown) */}
                                {isMenuOpen && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-header">
                                            <p className="full-name">{username}</p>
                                            <p className="email-text">Email: {email}</p>
                                        </div>
                                        <div className="dropdown-footer">
                                            <button className="btn-action" onClick={() => navigate("/perfil")}>Perfil</button>
                                            <button className="btn-action" onClick={handleLogout}>Sair</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <button className="btn-login" onClick={() => navigate("/login")}>Entrar</button>
                                <button className="btn-signup" onClick={() => navigate("/signup")}>Cadastrar-se</button>
                            </div>
                        )}
                    </nav>
                </header>

                <div className="fundo-content-user">
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