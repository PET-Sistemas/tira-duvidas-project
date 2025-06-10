import { CreateFeedbackDTO } from "../dtos/feedback/create-feedback.dto.js";

export function createFeedback(data: CreateFeedbackDTO) {
  return fetch("http://localhost:8080/api/feedback/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function allFeedbacks() {
  const response = await fetch("http://localhost:8080/api/feedback/", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar feedbacks");
  }

  const feedback = await response.json();
  return feedback;
}

export async function getFeedbacks(id: string) {
  const response = await fetch(`http://localhost:8080/api/feedback/answer/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar feedbacks");
  }
  const feedback = await response.json();

  return feedback[0];
}

export async function deleteFeedbacks(id: string) {
  const response = await fetch(`http://localhost:8080/api/feedback/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Falha ao deletar feedbacks");
  }

  const feedback = await response.json();
  return feedback;
}
