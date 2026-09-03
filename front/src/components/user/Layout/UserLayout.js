import React, { useEffect, useState, useRef } from "react";
import "./UserLayout.css";
import "../../global.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png";
import logoUfms from "../../../utils/images/logo-ufms.png";
import { useNavigate } from "react-router-dom";

function UserLayout({ children }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // Novo estado para o email
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do dropdown
    const menuRef = useRef(null); // Referência para o container do menu

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("username");
        const storedEmail = sessionStorage.getItem("email");
        if (storedUsername) {
            setUsername(storedUsername);
            setEmail(storedEmail || "usuario@gmail.com"); 
        }
    }, []);

    // Fechar menu ao clicar fora do container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    const firstName = username ? username.trim().split(" ")[0] : "";

    return (
        <div className="bodyUser">
            <main className="mainUser">
                <header className="header">
                    <div className="items-header">
                        <a href="/" className="logo-link">
                            <img src={tiraDuvidasLogo} alt="Logo" className="logo-cadasroDuvidas" />
                        </a>
                        <a href="/sobrenos" className="sobre-nav-link">
                            <i className="bi bi-info-circle-fill"></i>Equipe
                        </a>
                    </div>

                    <nav className="nav">
                        {username ? (
                            <div className="user-container" ref={menuRef}> {/* Container relativo */}
                                <div className="user-info" onClick={toggleMenu} style={{cursor: 'pointer'}}>
                                    <button className="btn-profile">
                                        <img src={defaultProfilePic} alt="Perfil" className="profile-img-nav" />
                                    </button>
                                    <span className="username">Olá, {username}</span>
                                </div>

                            {/* Dropdown de Perfil */}
                            {isMenuOpen && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-header">
                                        <p className="full-name">{username || "Usuário"}</p>
                                        <p className="email-text">Email: {email}</p>
                                    </div>
                                    <div className="dropdown-footer">
                                        <button className="btn-primary" onClick={() => navigate("/perfil")}>Perfil</button>
                                        <button className="btn-primary" onClick={handleLogout}>Sair</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="fundo-content-user">
                    {children}
                </div>

                <footer>
                    <img src={logoUfms} alt="Logo UFMS" />
                </footer>
            </main>
        </div>
    );
}

export default UserLayout;
