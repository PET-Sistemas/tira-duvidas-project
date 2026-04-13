import React, { useEffect, useState } from "react";
import "./AdminLayout.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png"; // Imagem padrão
import logoUfms from "../../../utils/images/logo-ufms.png";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";

function AdminLayout({ children }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
      const storedUsername = sessionStorage.getItem("username");
      const storedEmail = sessionStorage.getItem("email");

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
    <main className="mainAdmin">
      <header className="header">
        <a href="/" className="logo-link">
            <img
                src={tiraDuvidasLogo}
                alt="Tira Dúvidas Logo"
                className="logo-cadasroDuvidas"
            />
        </a>
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
                            <button className="btn-primary" onClick={handleLogout}>Sair</button>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="auth-buttons">
                <button className="btn-primary" onClick={() => navigate("/login")}>Entrar</button>
                <button className="btn-primary" onClick={() => navigate("/signup")}>Cadastrar-se</button>
            </div>
        )}
    </nav>

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
