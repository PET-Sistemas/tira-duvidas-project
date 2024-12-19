import React, { useState, useEffect } from 'react';
import './MinhasDuvidas.css';
import naoAvaliadoIcon from '../NaoAvaliado.png';
import bemAvaliadoIcon from '../BemAvaliado.png';
import malAvaliadoIcon from '../MalAvaliado.png';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import defaultProfilePic from '../default-profile.png';
import FilterIcon from '../filtrar.png'; 


function MinhasDuvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [duvidasFiltradas, setDuvidasFiltradas] = useState([]);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState('crescente'); // Estado para o filtro

  useEffect(() => {
    // Simula a busca de dados do backend
    const mockDuvidas = [
      { id: 1, titulo: 'Dúvida 1', descricao: 'Descrição 1', situacao: 'Não Avaliado', data: '27-06-2024', respostas: 0 },
      { id: 2, titulo: 'Dúvida 2', descricao: 'Descrição 2', situacao: 'Satisfatório', data: '26-06-2024', respostas: 1 },
      { id: 3, titulo: 'Dúvida 3', descricao: 'Descrição 3', situacao: 'Insatisfatório', data: '25-06-2024', respostas: 1 },
    ];
    setDuvidas(mockDuvidas);
    setDuvidasFiltradas(mockDuvidas); // Inicializa com as dúvidas sem filtro
  }, []);

  // Função para retornar o ícone correto, precisa da lógica da situação
  const getIcon = (situacao) => {
    switch (situacao) {
      case 'Não Avaliado':
        return naoAvaliadoIcon;
      case 'Satisfatório':
        return bemAvaliadoIcon;
      case 'Insatisfatório':
        return malAvaliadoIcon;
      default:
        return naoAvaliadoIcon;
    }
  };

  // Função para alternar a visibilidade do filtro
  const toggleFiltroVisivel = () => {
    setFiltroVisivel(!filtroVisivel);
  };

  // Função para lidar com a mudança no filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  // Função para aplicar o filtro
  const aplicarFiltro = () => {
    let novasDuvidas = [...duvidas]; // Cria uma cópia das dúvidas

    // Aplica a lógica de filtragem ou ordenação
    if (filtro === 'crescente') {
      novasDuvidas.sort((a, b) => a.respostas - b.respostas); // Ordena por respostas em ordem crescente
    } else if (filtro === 'decrescente') {
      novasDuvidas.sort((a, b) => b.respostas - a.respostas); // Ordena por respostas em ordem decrescente
    } else if (filtro === 'bemAvaliado') {
      novasDuvidas = novasDuvidas.filter((duvida) => duvida.situacao === 'Satisfatório');
    } else if (filtro === 'malAvaliado') {
      novasDuvidas = novasDuvidas.filter((duvida) => duvida.situacao === 'Insatisfatório');
    } else if (filtro === 'naoAvaliado') {
      novasDuvidas = novasDuvidas.filter((duvida) => duvida.situacao === 'Não Avaliado');
    }

    setDuvidasFiltradas(novasDuvidas); // Atualiza as dúvidas filtradas
  };

  return (
    <div className="container-duvidas">
      <header className="minhas-duvidas-header">
        <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-cadasroDuvidas" />
        <nav className="minhas-duvidas-nav">
          <a href="#sobre" className="minhas-duvidas-nav-link-sobre">Sobre nós</a>
          <a href="#perguntas-frequentes" className="minhas-duvidas-nav-link-perguntas">Perguntas Frequentes</a>
          <div className="minhas-duvidas-search-bar">
            <input type="text" placeholder="Pesquisar dúvidas..." className="minhas-duvidas-search-input" />
            <button className="minhas-duvidas-search-btn">Buscar</button>
          </div>
          <a href="/perfil" className="profile-btn">
            <img src={defaultProfilePic} alt="icon-profile" className="user-profile-img" />
          </a>
        </nav>
      </header>

      <h2 className="titulo-pagina">Minhas Dúvidas</h2>
    
    <div className='filtrar-container'>      
        <button className="filtrar-btn" onClick={toggleFiltroVisivel}> 
        <img src={FilterIcon} alt="Filter Icon" className="filter-icon-profile" />
        Filtrar</button>

        {filtroVisivel && (
        <div className="filtro-container">
          <select onChange={handleFiltroChange} value={filtro}>
            <option value="crescente">Crescente</option>
            <option value="decrescente">Decrescente</option>
            <option value="bemAvaliado">Bem Avaliado</option>
            <option value="malAvaliado">Mal Avaliado</option>
            <option value="naoAvaliado">Não Avaliado</option>
          </select>
          <button onClick={aplicarFiltro} className='button-filter'>Aplicar filtro</button>
        </div>
      )}
    </div>
    

      {duvidasFiltradas.map((duvida) => (
        <div key={duvida.id} className="card-duvida">
          <div className="icon-container">
            <img src={getIcon(duvida.situacao)} alt="Situação" className="icon-situacao" />
          </div>
          <div className="content">
            <h3 className="titulo-duvida">{duvida.titulo}</h3>
            <p className="descricao-duvida">{duvida.descricao}</p>
          </div>
          <div className="info-duvida">
            <p><strong>{duvida.data}</strong></p>
            <p><strong>{duvida.situacao}</strong></p>
            <p><strong>{duvida.respostas} resposta(s)</strong></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MinhasDuvidas;
