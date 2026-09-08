import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MinhasDuvidasDetalhe.css";
import { getAnswers } from "../../../services/answers.service";
import { createFeedback, getFeedbacks } from "../../../services/feedback.service";
import { deleteQuestion, updateQuestionAnswered } from "../../../services/question.service";
import UserLayout from "../Layout/UserLayout";

function MinhasDuvidasDetalhe() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doubt, setDoubt] = useState(location.state?.doubt);

  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);
  const [menuAcoesAberto, setMenuAcoesAberto] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(doubt?.title ?? "");
  const [editedDescription, setEditedDescription] = useState(doubt?.description ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        if (!doubt) return;

        const questionerId = sessionStorage.getItem("id");
        if (!questionerId) {
          throw new Error("Usuário não autenticado");
        }

        const answersResp = await getAnswers(doubt.id);
        const answerResp = answersResp[answersResp.length - 1];
        setAnswer(answerResp);
        setAnswers(answersResp);

        if (answerResp?.id) {
          const feedbackResp = await getFeedbacks(answerResp.id);
          if (feedbackResp) {
            setFeedbackType(feedbackResp.status);
            setFeedback(feedbackResp.justification);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [doubt]);

  if (!doubt) {
    return <p>Dúvida não encontrada.</p>;
  }

  const authenticatedUserId = sessionStorage.getItem("id");
  const questionAuthorId = doubt.questionerId ?? doubt.questioner?.id;
  const isQuestionAuthor = String(questionAuthorId) === String(authenticatedUserId);
  const canManageQuestion = !loading && answers.length === 0 && isQuestionAuthor;

  const handleFeedbackClick = (type) => {
    setShowFeedbackInput(true);
    setFeedbackType(type);
  };

  const handleSendFeedback = async () => {
    if (feedback.trim() === "") {
      alert("Por favor, escreva seu feedback antes de enviar.");
      return;
    }

    try {
      const feedbackResponse = await createFeedback({
        userId: Number(authenticatedUserId),
        answerId: answer.id,
        justification: feedback,
        status: feedbackType,
      });

      if (!feedbackResponse.ok) {
        throw new Error("Não foi possível registrar a avaliação.");
      }

      setShowFeedbackInput(false);
      alert("Feedback enviado com sucesso!");
    } catch (err) {
      alert(err.message || "Erro ao enviar a avaliação.");
    }
  };

  const handleStartEdit = () => {
    if (!canManageQuestion) return;
    setMenuAcoesAberto(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedTitle(doubt.title);
    setEditedDescription(doubt.description);
    setIsEditing(false);
  };

  const handleSaveQuestion = async (event) => {
    event.preventDefault();
    if (!canManageQuestion) {
      setIsEditing(false);
      return;
    }

    const title = editedTitle.trim();
    const description = editedDescription.trim();

    if (!title || !description) {
      alert("Preencha o título e a descrição da dúvida.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await updateQuestionAnswered({ id: doubt.id, title, description });
      if (!response.ok) throw new Error("Não foi possível atualizar a dúvida.");

      setDoubt((current) => ({ ...current, title, description }));
      setIsEditing(false);
      alert("Dúvida atualizada com sucesso!");
    } catch (err) {
      alert(err.message || "Erro ao atualizar a dúvida.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!canManageQuestion || isSaving) return;
    setMenuAcoesAberto(false);
    if (!window.confirm(`Excluir a dúvida "${doubt.title}"? Esta ação não pode ser desfeita.`)) return;

    setIsSaving(true);
    try {
      await deleteQuestion(String(doubt.id));
      alert("Dúvida excluída com sucesso!");
      navigate("/minhas-duvidas", { replace: true });
    } catch (err) {
      alert(err.message || "Erro ao excluir a dúvida.");
      setIsSaving(false);
    }
  };

  return (
    <UserLayout>
      {/* Wrapper com classe de escopo — evita vazamento de CSS */}
      <div className="pagina-detalhe-duvida">
        <h2 style={{ textAlign: "center", color: "#3498DB" }}>Detalhes da Dúvida</h2>

        <section className="duvida-info">
          {isEditing ? (
            <form className="edicao-duvida-form" onSubmit={handleSaveQuestion}>
              <label htmlFor="titulo-duvida">Título</label>
              <input id="titulo-duvida" value={editedTitle} onChange={(event) => setEditedTitle(event.target.value)} disabled={isSaving} autoFocus />
              <label htmlFor="descricao-duvida">Descrição</label>
              <textarea id="descricao-duvida" value={editedDescription} onChange={(event) => setEditedDescription(event.target.value)} disabled={isSaving} rows={5} />
              <div className="acoes-edicao-duvida">
                <button type="button" className="btn-cancelar-edicao" onClick={handleCancelEdit} disabled={isSaving}>Cancelar</button>
                <button type="submit" className="btn-salvar-duvida" disabled={isSaving}>{isSaving ? "Salvando..." : "Salvar alterações"}</button>
              </div>
            </form>
          ) : (
            <>
              <div className="cabecalho-duvida">
                <h3>{doubt.title}</h3>
                {canManageQuestion && (
                  <div className="menu-acoes-duvida">
                    <button
                      type="button"
                      className="btn-menu-acoes"
                      aria-label="Mais ações para esta dúvida"
                      aria-expanded={menuAcoesAberto}
                      onClick={() => setMenuAcoesAberto((aberto) => !aberto)}
                    >
                      <span aria-hidden="true">⋮</span>
                    </button>
                    {menuAcoesAberto && (
                      <div className="opcoes-acoes-duvida" role="menu">
                        <button type="button" role="menuitem" onClick={handleStartEdit}>Editar dúvida</button>
                        <button type="button" role="menuitem" className="opcao-excluir" onClick={handleDeleteQuestion}>Excluir dúvida</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <h4>{doubt.description}</h4>
            </>
          )}

          {/* Botão toggle */}
          <button
            className={`btn-detalhes${detalhesAbertos ? " aberto" : ""}`}
            onClick={() => setDetalhesAbertos((prev) => !prev)}
          >
            Detalhes da Dúvida
            <span className="chevron">▾</span>
          </button>

          {/* Painel expansível */}
          <div className={`duvida-detalhes-painel${detalhesAbertos ? " aberto" : ""}`}>
            <p><strong>Questionador:</strong> {doubt.questioner.name}</p>
            <p><strong>Categoria:</strong> {doubt.customCategory || (doubt.categories?.[0]?.name ?? "Sem categoria")}</p>
            <p><strong>Data:</strong> {new Date(doubt.createdAt).toLocaleDateString("pt-BR")}</p>
          </div>
        </section>

        {answers.length > 0 ? (
          <section className="respostas-anteriores">
            <h3>Respostas Anteriores</h3>
            {answers.map((answer) => (
              <div key={answer.id} className="resposta-anterior">
                <p><strong>Resposta:</strong> {answer.description}</p>
                <p><strong>Nome do Respondente:</strong> {answer.respondentName}</p>
                <p><strong>Data da Resposta:</strong>{" "}{new Date(answer.createdAt).toLocaleDateString("pt-BR")}</p>
              </div>
            ))}
          </section>
        ) : (
          <section className="respostas-anteriores">
            <h3>Respostas Anteriores</h3>
            <p>Esta dúvida ainda não possui respostas anteriores.</p>
          </section>
        )}

        <section className="resposta">
          <h3>Resposta Atual</h3>
          {doubt.status === "not_answered" ? (
            <p>Ainda não há resposta atual para esta dúvida.</p>
          ) : (
            <>
              <p><strong>{answer.description}</strong></p>
              <br></br>
              <p><strong>Respondente:</strong> {answer.respondentName}</p>
              <p><strong>Data:</strong>{" "}{new Date(answer.createdAt).toLocaleDateString("pt-BR")}</p>
            </>
          )}
        </section>

        {doubt.status === "answered" && isQuestionAuthor && (
          <section className="feedback">
            <h3 className="avaliacao-titulo">Avaliação</h3>

            {feedback && !showFeedbackInput ? (
              <div className="feedback-container">
                <p className="feedback-visualizacao">
                  <strong>Feedback: </strong> {feedback}
                </p>
              </div>
            ) : (
              <>
                {!showFeedbackInput && (
                  <div className="avaliacao">
                    <button className="btn-satisfatoria" onClick={() => handleFeedbackClick("satisfactory")}>
                      👍 Satisfatória
                    </button>
                    <button className="btn-insatisfatoria" onClick={() => handleFeedbackClick("unsatisfactory")}>
                      👎 Insatisfatória
                    </button>
                  </div>
                )}

                {showFeedbackInput && (
                  <div className="feedback-container">
                    <textarea
                      className="feedback-input"
                      placeholder={`Explique por que a resposta foi ${feedbackType === "satisfactory" ? "satisfatória" : "insatisfatória"}...`}
                      value={feedback}
                      onChange={(event) => setFeedback(event.target.value)}
                    />
                    <button className="btn-enviar-feedback" onClick={handleSendFeedback}>
                      Enviar avaliação
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </UserLayout>
  );
}

export default MinhasDuvidasDetalhe;
