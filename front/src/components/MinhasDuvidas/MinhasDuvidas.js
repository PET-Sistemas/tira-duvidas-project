import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MinhasDuvidas.css";
import naoAvaliadoIcon from "../NaoAvaliado.png";
import bemAvaliadoIcon from "../BemAvaliado.png";
import malAvaliadoIcon from "../MalAvaliado.png";
import tiraDuvidasLogo from "../Logo-Tira-Dúvidas-removebg.png";
import defaultProfilePic from "../default-profile.png";
import FilterIcon from "../filtrar.png";

function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState("crescente");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDuvidas = async () => {
      try {
        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch(
          `http://localhost:8080/api/question/user/${questionerId}`
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar dúvidas");
        }
        const data = await response.json();
        setDuvidas(data);
        setFilteredDoubts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuvidas();
  }, []);

  const aplicarFiltro = () => {
    let novasDuvidas = [...duvidas];

    if (filtro === "crescente") {
      novasDuvidas.sort((a, b) => a.respostas - b.respostas);
    } else if (filtro === "decrescente") {
      novasDuvidas.sort((a, b) => b.respostas - a.respostas);
    } else if (filtro === "bemAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Satisfatório"
      );
    } else if (filtro === "malAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Insatisfatório"
      );
    } else if (filtro === "naoAvaliado") {
      novasDuvidas = novasDuvidas.filter(
        (duvida) => duvida.situacao === "Não Avaliado"
      );
    }

    setFilteredDoubts(novasDuvidas);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="minhas-duvidas">
      <header className="minhas-duvidas-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadastroDuvidas" />
        <nav className="minhas-duvidas-nav">
          <a href="#sobre">Sobre nós</a>
          <a href="#perguntas-frequentes">Perguntas Frequentes</a>
          <div className="minhas-duvidas-search-bar">
            <input
              type="text"
              placeholder="Pesquisar dúvidas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={aplicarFiltro}>Buscar</button>
          </div>
          <a href="/perfil">
            <img src={defaultProfilePic} alt="Perfil" className="user-profile-img" />
          </a>
        </nav>
      </header>

      <h2>Minhas Dúvidas</h2>

      <div className="filtrar-container">
        <button className="filtrar-btn" onClick={() => setFiltroVisivel(!filtroVisivel)}>
          <img src={FilterIcon} alt="Filtrar" className="filter-icon" /> Filtrar
        </button>

        {filtroVisivel && (
          <div className="filtro-container">
            <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
              <option value="crescente">Mais antigos</option>
              <option value="decrescente">Mais recentes</option>
              <option value="bemAvaliado">Bem Avaliadas</option>
              <option value="malAvaliado">Mal Avaliadas</option>
              <option value="naoAvaliado">Não Avaliadas</option>
            </select>
            <button onClick={aplicarFiltro}>Aplicar filtro</button>
          </div>
        )}
      </div>

      {filteredDoubts.length === 0 ? (
        <div className="sem-duvidas">Nenhuma dúvida encontrada</div>
      ) : (
        filteredDoubts.map((duvida) => (
          <div key={duvida.id} className="card-duvida">
            <img src={duvida.situacao === "Satisfatório" ? bemAvaliadoIcon : duvida.situacao === "Insatisfatório" ? malAvaliadoIcon : naoAvaliadoIcon} alt="Situação" />
            <h3>{duvida.title}</h3>
            <p>{duvida.description}</p>
            <p>
              <strong>{new Date(duvida.createdAt).toLocaleDateString("pt-BR")}</strong>
            </p>
            <p><strong>{duvida.situacao}</strong></p>
            <p><strong>{duvida.respostas} resposta(s)</strong></p>
          </div>
        ))
      )}
    </div>
  );
}

export default MinhasDuvidas;
