import { CreateAnswersDTO } from "../dtos/answers/create-answers.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export function createAnswers(data: CreateAnswersDTO) {
  return fetch(`${API_URL}/answers/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

export async function allAnswers() {
  // Retornar dados mockados
  return [
    { id: 1, questionId: 1, content: "Resposta 1 para a dúvida 1", user: "Usuário 1" },
    { id: 2, questionId: 2, content: "Resposta 2 para a dúvida 2", user: "Usuário 2" },
  ];
}

export async function getAnswers(id: string) {
  if (!id || isNaN(Number(id))) {
    throw new Error("ID inválido para buscar respostas.");
  }
  
  // Retornar dados mockados para respostas de uma dúvida específica
  return [
    { id: 1, questionId: id, content: `Resposta 1 para a dúvida ${id}`, user: "Usuário 1" },
    { id: 2, questionId: id, content: `Resposta 2 para a dúvida ${id}`, user: "Usuário 2" },
  ];
}

export async function deleteAnswers(id: string) {
  const response = await fetch(`${API_URL}/answers/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Falha ao deletar respostas");
  }

  const answers = await response.json();
  return answers;
}
