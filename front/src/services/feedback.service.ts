import { CreateFeedbackDTO } from "../dtos/feedback/create-feedback.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function createFeedback(data: CreateFeedbackDTO) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Os dados do feedback não podem estar vazios.");
  }
  try {
    return await fetch(`${API_URL}/feedback/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function allFeedbacks() {
  try {
    const response = await fetch(`${API_URL}/feedback/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao carregar feedbacks");
    }

    const feedback = await response.json();
    return feedback;
  } catch (error) {
    throw error;
  }
}

export async function getFeedbacks(id: string) {
  if (!id) {
    throw new Error("ID é obrigatório para buscar o feedback.");
  }
  try {
    const response = await fetch(`${API_URL}/feedback/answer/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao carregar feedbacks");
    }

    const feedback = await response.json();

    return feedback[0];
  } catch (error) {
    throw error;
  }
}

export async function deleteFeedbacks(id: string) {
  if (!id) {
    throw new Error("ID é obrigatório para deletar o feedback.");
  }
  try {
    const response = await fetch(`${API_URL}/feedback/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao deletar feedbacks");
    }
    if (response.status === 204) {
      return true;
    }
    const feedback = await response.json();
    return feedback;
  } catch (error) {
    throw error;
  }
}
