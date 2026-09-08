import React, { useState, useEffect, useRef } from "react";
import "./DuvidasShared.css";
import FilterIcon from "../../../utils/images/filtrar.png";

/**
 * Hook compartilhado para gerenciar estado e lógica de filtros de dúvidas.
 */
function filterDoubts(duvidas, filtro, search) {
  let result = [...duvidas];

  if (search) {
    const normalizedSearch = search.toLowerCase();
    result = result.filter(
      (d) =>
        d.title.toLowerCase().includes(normalizedSearch) ||
        d.description.toLowerCase().includes(normalizedSearch),
    );
  }

  if (filtro === "respondidas") {
    result = result.filter((d) => d.status === "answered");
  } else if (filtro === "naoRespondidas") {
    result = result.filter((d) => d.status !== "answered");
  } else if (filtro === "crescente") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (filtro === "decrescente") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

function getSavedFilter(storageKey) {
  if (!storageKey) return { filtro: "crescente", search: "" };

  try {
    const savedFilter = JSON.parse(sessionStorage.getItem(storageKey));
    return {
      filtro: savedFilter?.filtro || "crescente",
      search: savedFilter?.search || "",
    };
  } catch {
    return { filtro: "crescente", search: "" };
  }
}

export function useDuvidasFilter(duvidas, storageKey) {
  const savedFilter = getSavedFilter(storageKey);
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [filtro, setFiltro] = useState(savedFilter.filtro);
  const [search, setSearch] = useState(savedFilter.search);
  const [filteredDoubts, setFilteredDoubts] = useState([]);

  useEffect(() => {
    const appliedFilter = getSavedFilter(storageKey);
    setFiltro(appliedFilter.filtro);
    setSearch(appliedFilter.search);
    setFilteredDoubts(
      filterDoubts(duvidas, appliedFilter.filtro, appliedFilter.search),
    );
  }, [duvidas, storageKey]);

  const toggleFiltroVisivel = () => setFiltroVisivel((v) => !v);
  const handleFiltroChange = (e) => setFiltro(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const aplicarFiltro = () => {
    if (storageKey) {
      sessionStorage.setItem(storageKey, JSON.stringify({ filtro, search }));
    }

    setFilteredDoubts(filterDoubts(duvidas, filtro, search));
    setFiltroVisivel(false);
  };

  return {
    filtroVisivel,
    filtro,
    search,
    filteredDoubts,
    toggleFiltroVisivel,
    handleFiltroChange,
    handleSearchChange,
    aplicarFiltro,
  };
}

/**
 * Componente de filtro compartilhado (botão + painel dropdown).
 */
export function DuvidasFilter({
  filtroVisivel,
  filtro,
  search,
  onToggle,
  onFiltroChange,
  onSearchChange,
  onAplicar,
}) {
  const filterContainerRef = useRef(null);

  useEffect(() => {
    if (!filtroVisivel) return undefined;

    const handleClickOutside = (event) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target)
      ) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filtroVisivel, onToggle]);

  return (
    <div className="filtrar-container-shared" ref={filterContainerRef}>
      <button className="btn-primary" onClick={onToggle}>
        <i className="bi bi-filter filter-icon-shared"></i>
        {" "}Filtrar
      </button>

      {filtroVisivel && (
        <div className="filtro-container-shared">
          <input
            type="text"
            placeholder="Buscar por palavra"
            value={search}
            onChange={onSearchChange}
            className="search-input-shared"
          />
          <select onChange={onFiltroChange} value={filtro}>
            <option value="">Selecione um filtro</option>
            <option value="crescente">Mais antigos</option>
            <option value="decrescente">Mais recentes</option>
            <option value="naoRespondidas">Não Respondidas</option>
            <option value="respondidas">Respondidas</option>
          </select>
          <button onClick={onAplicar} className="btn-primary">
            Aplicar filtro
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Card compartilhado para exibir uma dúvida.
 *
 * Props:
 *   doubt         — objeto da dúvida
 *   onClick       — (opcional) handler de clique no card inteiro
 *   showQuestioner — (padrão false) exibe o nome do questionador
 *   actionSlot    — (opcional) React node renderizado abaixo da descrição (ex: botão Responder)
 */
export function DoubtCard({ doubt, onClick, showQuestioner = false, actionSlot }) {
  const getStatusClass = (status) => {
    if (status === "answered") return "status-respondida";
    if (status === "insatisfeito") return "status-insatisfeito";
    return "";
  };

  const getStatusIcon = (status) => {
    if (status === "insatisfeito") return "❌";
    if (status === "not_answered") return "⚠️";
    if (status === "answered") return "✅";
    return "❓";
  };

  const getStatusText = (status) => {
    if (status === "not_answered") return "Não Respondida";
    if (status === "answered") return "Respondida";
    return "Pendente";
  };

  return (
    <div
      className={`doubt-card-shared ${getStatusClass(doubt.status)}`}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <div className="doubt-card-header-shared">
        <span className="status-icon-shared">{getStatusIcon(doubt.status)}</span>
        <div className="doubt-main-info-shared">
          <h3 className="doubt-title-shared">{doubt.title}</h3>
          <p className="doubt-description-shared">{doubt.description}</p>
          {actionSlot}
        </div>
      </div>
      <div className="doubt-additional-info-shared">
        {showQuestioner && (
          <p>
            <strong>Usuário:</strong> {doubt.questioner?.name ?? "Desconhecido"}
          </p>
        )}
        <p>
          <strong>Categoria:</strong>{" "}
          {doubt.customCategory || (doubt.categories?.[0]?.name ?? "Sem categoria")}
        </p>
        <p>
          <strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}
        </p>
        <p>
          <strong>Status:</strong> {getStatusText(doubt.status)}
        </p>
      </div>
    </div>
  );
}
