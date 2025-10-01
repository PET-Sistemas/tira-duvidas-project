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
import tiraDuvidasLogo from "./utils/images/Logo-Tira-Dúvidas-removebg.png";
import {
  allQuestion,
  getQuestionByTitle,
} from "./services/question.service.ts";
import { allCategory } from "./services/category.service.ts";
import MinhasDuvidasDetalhe from "./components/user/MinhasDuvidasDetalhe/MinhasDuvidasDetalhe.js";
import ResponderDuvidasDetalhe from "./components/user/ResponderDuvidasDetalhe/ResponderDuvidasDetalhe.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import logoUfms from "./utils/images/logo-ufms.png";
import ilustracaoPergunta from "./utils/images/ilustracao-pergunta.png";
import fotoprofile from "./utils/images/Vector.png";
import SobreNos from "./components/user/SobreNos/SobreNos.js";
import EsqueciMinhaSenha from "./components/user/EsqueciMinhaSenha/EsqueciMinhaSenha.js";
import UserLayout from "./components/user/Layout/UserLayout.js";
import Duvidas from "./components/user/Duvidas/Duvidas.js";
import DuvidasRespondidas from "./components/user/DuvidasRespondidas/DuvidasRespondidas.js";

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]); // Estado para armazenar as perguntas
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para armazenar a categoria selecionada

  useEffect(() => {
    // Verifica se há um username armazenado no sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Chama a API para buscar todas as categorias e perguntas
    const fetchData = async () => {
      try {
        const fetchedCategories = await allCategory(); // Faz a requisição para obter todas as categorias
        const fetchedQuestions = await allQuestion(); // Faz a requisição para obter todas as perguntas
        setCategories(fetchedCategories); // Atualiza o estado das categorias
        setQuestions(fetchedQuestions); // Atualiza o estado das perguntas
      } catch (error) {
        console.error("Erro ao buscar categorias ou perguntas:", error);
      }
    };

    fetchData(); // Chama a função fetchData
  }, []);

  // Função para filtrar as perguntas pela categoria
  const filterQuestionsByCategory = async (categoryName) => {
    setSelectedCategory(categoryName); // Atualiza a categoria selecionada
    try {
      // Chama a API para buscar perguntas que correspondem ao título da categoria
      const filteredQuestions = await getQuestionByTitle(categoryName);
      setQuestions(filteredQuestions); // Atualiza o estado das perguntas filtradas
    } catch (error) {
      console.error("Erro ao filtrar perguntas:", error);
    }
  };

  const handleLogout = () => {
    // Remove o username e o id do sessionStorage, redefine o estado e redireciona para a tela de login
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    setUsername("");
    navigate("/login");
  };

  const searchQuestion = async () => {
    const valor = document.getElementById("searchInput").value;

    if (valor === "") {
      // Se o campo de pesquisa estiver vazio, recarrega todas as perguntas
      const fetchedQuestions = await allQuestion();
      setQuestions(fetchedQuestions);
    } else {
      // Caso contrário, busca perguntas que correspondem ao título
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
          path="/admin" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsuariosGerenciamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categorias" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoriasGerenciamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificados" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <CertificadosGerados />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/perfil-gerenciamento" // O URL que o usuário vai acessar
          element={
            <ProtectedRoute roles={["admin"]}>
              <PerfilGerenciamento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<App />} /> {/* Página inicial */}
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/cadastroduvidas" element={<CadastroDuvidas />} />
  //       <Route path="/perfil" element={<PerfilUsuario />} />
  //       <Route path="/minhas-duvidas" element={<MinhasDuvidas />} />
  //       <Route path="/responder-duvidas" element={<ResponderDuvidas />} />
  //       <Route path="/painel-questioner" element={<PainelQuestionador />} />
  //       <Route path="/painel-respondent" element={<PainelRespondente />} />
  //       <Route path="/duvida/:id" element={<MinhasDuvidasDetalhe />} /> {/* Detalhes de dúvida */}
  //       <Route path="/responder-duvidas-detalhe" element={<ResponderDuvidasDetalhe />} />
  //       <Route path="/responder-duvidas/:id" element={<ResponderDuvidasDetalhe />} /> {/* Detalhes de dúvida */}
  //     </Routes>
  //   </Router>
  // );
}

export default AppWrapper;
