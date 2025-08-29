import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './PainelQuestionador.css';
import tiraDuvidasLogo from '../../utils/images/Logo-Tira-Dúvidas-removebg.png';
import fotoprofile from '../../utils/images/Vector.png';
import ufmsLogo from '../../utils/images/ufms-logo.png';
import logoUfms from '../../utils/images/logo-ufms.png';
import imgCard1 from '../../utils/images/MinhasDuvidas.png';
import imgCard2 from '../../utils/images/DadosPessoais.png';

function PainelQuestionador() {    
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        navigate('/login');
    };

    useEffect(() => {
        // Verifica se há um username armazenado no sessionStorage
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        // Verifica se há um username armazenado no sessionStorage
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="container-painel-questionador">
            <header className="app-home-header-painelq">
                <div className="items-header-painel-questionador">
                    <a href="/" className="app-home-logo-link">
                        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
                    </a>
                    <a href="sobrenos" className="app-sobre-nav-link">Sobre nós</a>
                </div>
            <header className="app-home-header-painelq">
                <div className="items-header-painel-questionador">
                    <a href="/" className="app-home-logo-link">
                        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
                    </a>
                    <a href="sobrenos" className="app-sobre-nav-link">Sobre nós</a>
                </div>

                <nav className="app-home-nav-painelq">          
                {username ? (
                    // Exibe o nome do usuário se estiver logad
                    <div className="app-home-user-info">
                    <button onClick={() => navigate("/painel-questionador")} className="app-home-btn-profile">
                        <img src={fotoprofile} alt="Foto de perfil" className="w-10 h-10 rounded-full object-cover" />
                    </button>             
                    <span className="app-home-username">Olá, {username}!</span>
                    </div>
                ) : (
                    // Exibe os botões de login e cadastro se o usuário não estiver logado
                    <>
                    <button onClick={() => navigate('/login')} className="app-home-btn-login">Entrar</button>
                    <button onClick={() => navigate('/signup')} className="app-home-btn-signup">Cadastrar-se</button>
                    </>
                )}
                </nav>
      </header>
                <nav className="app-home-nav-painelq">          
                {username ? (
                    // Exibe o nome do usuário se estiver logad
                    <div className="app-home-user-info">
                        <button onClick={() => navigate("/painel-questionador")} className="app-home-btn-profile">
                            <img src={fotoprofile} alt="Foto de perfil" className="w-10 h-10 rounded-full object-cover" />
                        </button>             
                        <span className="app-home-username">Olá, {username}!</span>
                    </div>
                ) : (
                    // Exibe os botões de login e cadastro se o usuário não estiver logado
                    <>
                    <button onClick={() => navigate('/login')} className="app-home-btn-login">Entrar</button>
                    <button onClick={() => navigate('/signup')} className="app-home-btn-signup">Cadastrar-se</button>
                    </>
                )}
                </nav>
      </header>

            <main className="painel-questionador-main">
                <h1 className="painel-questionador-titulo">Painel do Usuário</h1>

                <div className="painel-questionador-cards">
                    <div className="painel-questionador-card" onClick={() => navigate("/minhas-duvidas")}>
                        <img src={imgCard1} alt="Minhas Dúvidas" className="painel-questionador-card-img" />
                        <span className="painel-questionador-card-title">Minhas Dúvidas</span>
                    </div>

                    <div className="painel-questionador-card" onClick={() => navigate("/perfil")}>
                        <img src={imgCard2} alt="Meus Dados Pessoais" className="painel-questionador-card-img" />
                        <span className="painel-questionador-card-title">Meus Dados Pessoais</span>
                    </div>
                </div>

                <button className="painel-questionador-logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </main>

            <footer>
                <img src={logoUfms} alt="Logo UFMS" />
            </footer>
        </div>
    );
}

export default PainelQuestionador;