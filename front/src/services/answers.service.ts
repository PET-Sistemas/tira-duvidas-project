import { CreateAnswersDTO } from "../dtos/answers/create-answers.dto.ts";

export function createAnswers(data: CreateAnswersDTO) {
  return fetch("http://localhost:8080/api/answers/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function allAnswers() {
  const response = await fetch("http://localhost:8080/api/answers/", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar respostas");
  }

  const answers = await response.json();
  return answers;
}

export async function getAnswers(id: string) {
  const response = await fetch(`http://localhost:8080/api/answers/question/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar respostas");
  }
  const answers = await response.json();
  return answers[0];
}

export async function deleteAnswers(id: string) {
  const response = await fetch(`http://localhost:8080/api/answers/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Falha ao deletar respostas");
  }

  const answers = await response.json();
  return answers;
}
