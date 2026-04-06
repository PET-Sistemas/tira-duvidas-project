import { CreateQuestionDTO } from "../dtos/question/create-question.dto";
import { UpdateQuestionDTO } from "../dtos/question/update-question-status.dto";

const API_URL = import.meta.env.VITE_API_URL;

export function createQuestion(data: CreateQuestionDTO) {
  return fetch(`${API_URL}/question/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

export async function allQuestion() {
  // Retornar dados mockados completos
  return [
    {
      id: 1,
      title: "Dúvida 1",
      description: "Descrição detalhada da dúvida 1",
      user: "Usuário 1",
      categories: [{ name: "Categoria 1" }],
      createdAt: new Date().toISOString(),
      status: "answered",
    },
    {
      id: 2,
      title: "Dúvida 2",
      description: "Descrição detalhada da dúvida 2",
      user: "Usuário 2",
      categories: [{ name: "Categoria 2" }],
      createdAt: new Date().toISOString(),
      status: "not_answered",
    },
  ];
}

export async function getQuestion(id: UpdateQuestionDTO) {
  // Retornar dados mockados para uma dúvida específica
  return { id, title: `Dúvida ${id}`, description: `Descrição da dúvida ${id}`, user: `Usuário ${id}` };
}

export async function getQuestionByUserId(user_id: string) {
  // Retornar dados mockados para dúvidas de um usuário específico
  return [
    { id: 1, title: "Minha Dúvida 1", description: "Descrição da minha dúvida 1", user: user_id },
    { id: 2, title: "Minha Dúvida 2", description: "Descrição da minha dúvida 2", user: user_id },
  ];
}

export async function getAnsweredQuestions(user_id: string) {
  // Retornar dados mockados para dúvidas respondidas
  return [
    { id: 1, title: "Dúvida Respondida 1", description: "Descrição da dúvida respondida 1", user: user_id },
    { id: 2, title: "Dúvida Respondida 2", description: "Descrição da dúvida respondida 2", user: user_id },
  ];
}

export async function getQuestionByTitle(title: string) {
  const response = await fetch(
    `${API_URL}/question/title/${title}`,
    { method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
     }
  );
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const question = await response.json();
  return question;
}

export async function deleteQuestion(id: string) {
  const response = await fetch(`${API_URL}/question/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const question = await response.json();
  return question;
}

export async function updateQuestionAnswered(data: UpdateQuestionDTO) {
  return fetch(`${API_URL}/question/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}
