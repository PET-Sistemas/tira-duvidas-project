import React, { useEffect, useState } from "react";
import "./AdminLayout.css";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../../../utils/images/default-profile.png";
import logoUfms from "../../../utils/images/logo-ufms.png";
import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUsername = sessionStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email");

    if (!token || !storedUsername) {
      navigate("/login");
      return;
    }

    setUsername(storedUsername);
    setEmail(storedEmail || "usuario@gmail.com");
  }, [navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <main className="mainAdmin">
      <header className="header">
        <a href="/admin" className="logo-link">
          <img
            src={tiraDuvidasLogo}
            alt="Tira Dúvidas Logo"
            className="logo-cadasroDuvidas"
          />
        </a>
        <nav className="nav">
          <div className="user-container">
            <div
              className="user-info"
              onClick={toggleMenu}
              style={{ cursor: "pointer" }}
            >
              <button className="btn-profile">
                <img
                  src={defaultProfilePic}
                  alt="Perfil"
                  className="profile-img-nav"
                />
              </button>
              <span className="username">Olá, {username}</span>
            </div>

            {/* Menu Dropdown do Perfil */}
            {isMenuOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p className="full-name">{username}</p>
                  <p className="email-text">Email: {email}</p>
                </div>
                <div className="dropdown-footer">
                  <button className="btn-primary" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <div className="fundo-content-admin">{children}</div>

      <footer>
        <img src={logoUfms} alt="Logo UFMS" />
      </footer>
    </main>
  );
}

export default AdminLayout;
