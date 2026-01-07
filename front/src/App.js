import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomeAdmin from "./components/admin/HomeAdmin/HomeAdmin.js";
import UsuariosGerenciamento from "./components/admin/UsuariosGerenciamento/UsuariosGerenciamento.js";
import CategoriasGerenciamento from "./components/admin/CategoriasGerenciamento/CategoriasGerenciamento.js";
import CertificadosGerados from "./components/admin/CertificadosGerados/CertificadosGerados.js";
import PerfilGerenciamento from "./components/admin/PerfilGerenciamento/PerfilGerenciamento.js";
import Login from "./components/user/Login/Logar.js";
import Signup from "./components/user/Cadastrar/Cadastro.js";
import CadastroDuvidas from "./components/user/CadastrarDuvidas/CadastroDuvidas.js";
import PerfilUsuario from "./components/user/Perfil/Perfil.js";
import MinhasDuvidas from "./components/user/MinhasDuvidas/MinhasDuvidas.js";
import ResponderDuvidas from "./components/user/ResponderDuvidas/ResponderDuvidas.js";
import PainelQuestionador from "./components/user/PainelQuestionador/PainelQuestionador.js";
import PainelRespondente from "./components/user/PainelRespondente/PainelRespondente.js";
import "./App.css";
import {
  allQuestion,
  getQuestionByTitle,
} from "./services/question.service.ts";
import { allCategory } from "./services/category.service.ts";
import MinhasDuvidasDetalhe from "./components/user/MinhasDuvidasDetalhe/MinhasDuvidasDetalhe.js";
import ResponderDuvidasDetalhe from "./components/user/ResponderDuvidasDetalhe/ResponderDuvidasDetalhe.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import ilustracaoPergunta from "./utils/images/ilustracao-pergunta.png";
import SobreNos from "./components/user/SobreNos/SobreNos.js";
import EsqueciMinhaSenha from "./components/user/EsqueciMinhaSenha/EsqueciMinhaSenha.js";
import UserLayout from "./components/user/Layout/UserLayout.js";
import Duvidas from "./components/user/Duvidas/Duvidas.js";
import DuvidasRespondidas from "./components/user/DuvidasRespondidas/DuvidasRespondidas.js";
import UsuarioDetalhes from "./components/admin/UsuarioDetalhes/UsuarioDetalhes.js"

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    const fetchData = async () => {
      try {
        const fetchedCategories = await allCategory(); 
        const fetchedQuestions = await allQuestion(); 
        setCategories(fetchedCategories); 
        setQuestions(fetchedQuestions); 
      } catch (error) {
        console.error("Erro ao buscar categorias ou perguntas:", error);
      }
    };

    fetchData(); 
  }, []);

  const filterQuestionsByCategory = async (categoryName) => {
    setSelectedCategory(categoryName); 
    try {
      const filteredQuestions = await getQuestionByTitle(categoryName);
      setQuestions(filteredQuestions); 
    } catch (error) {
      console.error("Erro ao filtrar perguntas:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    setUsername("");
    navigate("/login");
  };

  const searchQuestion = async () => {
    const valor = document.getElementById("searchInput").value;

    if (valor === "") {
      const fetchedQuestions = await allQuestion();
      setQuestions(fetchedQuestions);
    } else {
      const filteredQuestions = await getQuestionByTitle(valor);
      setQuestions(filteredQuestions);
    }
  };

  return (
    <UserLayout>
      {sessionStorage.getItem("role") === "questioner" && (
        <div className="welcome-container">
          <div className="welcome-content">
            <h1>
              Bem-vindo ao
              <br />
              <span>Tira Dúvidas</span>
            </h1>
            <p>
              Envie perguntas, obtenha respostas
              <br />e compartilhe conhecimento
            </p>
            <button
              onClick={() => navigate("/cadastroduvidas")}
              className="app-home-nav-link"
            >
              Faça uma pergunta
            </button>
          </div>
          <div className="welcome-illustration">
            <img
              src={ilustracaoPergunta}
              alt="Pessoa com ponto de interrogação"
            />
          </div>
        </div>  
      )}

      {sessionStorage.getItem("role") === "respondent" && (
        <div className="welcome-container">
          <div className="welcome-content">
            <h1>
              Bem-vindo ao
              <br />
              <span>Tira Dúvidas</span>
            </h1>
            <p>
              Responda perguntas
              <br />e compartilhe conhecimento
            </p>
            <button
              onClick={() => navigate("/responder-duvidas")}
              className="app-home-nav-link"
            >
              Perguntas
            </button>
          </div>
          <div className="welcome-illustration">
            <img
              src={ilustracaoPergunta}
              alt="Pessoa com ponto de interrogação"
            />
          </div>
        </div>  
      )}
    </UserLayout>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/esqueci-minha-senha" element={<EsqueciMinhaSenha />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["questioner", "respondent"]}>
              <App />,
            </ProtectedRoute>
          }
        />

        <Route
          path="/duvidas"
          element={
            <ProtectedRoute roles={["questioner", "respondent", "admin"]}>
              <Duvidas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastroduvidas"
          element={
            <ProtectedRoute roles={["questioner"]}>
              <CadastroDuvidas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute roles={["questioner", "respondent"]}>
              <PerfilUsuario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/minhas-duvidas"
          element={
            <ProtectedRoute roles={["questioner"]}>
              <MinhasDuvidas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder-duvidas"
          element={
            <ProtectedRoute roles={["respondent"]}>
              <ResponderDuvidas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/painel-questionador"
          element={
            <ProtectedRoute roles={["questioner"]}>
              <PainelQuestionador />
            </ProtectedRoute>
          }
        />

        <Route
          path="/painel-respondente"
          element={
            <ProtectedRoute roles={["respondent"]}>
              <PainelRespondente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/duvida/:id"
          element={
            <ProtectedRoute roles={["questioner", "respondent"]}>
              <MinhasDuvidasDetalhe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/duvidas-respondidas"
          element={
            <ProtectedRoute roles={["respondent"]}>
              <DuvidasRespondidas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder-duvidas-detalhe"
          element={
            <ProtectedRoute roles={["respondent"]}>
              <ResponderDuvidasDetalhe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder-duvidas/:id"
          element={
            <ProtectedRoute roles={["respondent"]}>
              <ResponderDuvidasDetalhe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sobrenos"
          element={
            <ProtectedRoute roles={["questioner", "respondent"]}>
              <SobreNos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsuariosGerenciamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categorias" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoriasGerenciamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificados" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <CertificadosGerados />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/perfil-gerenciamento" 
          element={
            <ProtectedRoute roles={["admin"]}>
              <PerfilGerenciamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios/:id" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsuarioDetalhes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
