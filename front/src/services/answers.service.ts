import { CreateAnswersDTO } from "../dtos/answers/create-answers.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function createAnswers(data: CreateAnswersDTO) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Os dados da resposta não podem estar vazios.");
  }

  try {
    return await fetch(`${API_URL}/answers/`, {
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

export async function allAnswers() {
  try {
    const response = await fetch(`${API_URL}/answers/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao carregar respostas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getAnswers(id: string) {
  if (!id || isNaN(Number(id))) {
    throw new Error("ID inválido para buscar respostas.");
  }
  try {
    const response = await fetch(`${API_URL}/answers/question/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao carregar respostas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteAnswers(id: string) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido para exclusão.");
    }
    const response = await fetch(`${API_URL}/answers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "falha ao deletar respostas");
    }
    const answers = await response.json();
    return answers;
  } catch (error) {
    throw error;
  }
}
