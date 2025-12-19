import { CreateFeedbackDTO } from "../dtos/feedback/create-feedback.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export function createFeedback(data: CreateFeedbackDTO) {
  return fetch(`${API_URL}/feedback/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

export async function allFeedbacks() {
  const response = await fetch(`${API_URL}/feedback/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar feedbacks");
  }

  const feedback = await response.json();
  return feedback;
}

export async function getFeedbacks(id: string) {
  const response = await fetch(`${API_URL}/feedback/answer/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar feedbacks");
  }
  const feedback = await response.json();

  return feedback[0];
}

export async function deleteFeedbacks(id: string) {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Falha ao deletar feedbacks");
  }

  const feedback = await response.json();
  return feedback;
}
