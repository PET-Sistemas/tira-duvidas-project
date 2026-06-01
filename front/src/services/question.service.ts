import { CreateQuestionDTO } from "../dtos/question/create-question.dto";
import { UpdateQuestionDTO } from "../dtos/question/update-question-status.dto";

const API_URL = import.meta.env.VITE_API_URL;

export async function createQuestion(data: CreateQuestionDTO) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Os dados da dúvida não podem estar vazios.");
  }
  try {
    return fetch(`${API_URL}/question/`, {
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

export async function allQuestion() {
  try {
    const response = await fetch(`${API_URL}/question/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao carregar dúvidas");
    }

    return await response;
  } catch (error) {
    throw error;
  }
}
export async function getQuestion(id: string) {
  if (!id) {
    throw new Error("ID é obrigatório para buscar a dúvida.");
  }
  try {
    const response = await fetch(`${API_URL}/question/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Dúvida não encontrada");
    }

    const question = await response.json();
    return question;
  } catch (error) {
    if (error instanceof TypeError)
      throw new Error("Erro de conexão. Verifique sua internet.");
    throw error;
  }
}

export async function getQuestionByUserId(user_id: string) {
  if (!user_id) {
    throw new Error("ID do usuário é obrigatório.");
  }
  try {
    const response = await fetch(`${API_URL}/question/user/${user_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Falha ao carregar dúvidas do usuário",
      );
    }
    return await response;
  } catch (error) {
    throw error;
  }
}

export async function getAnsweredQuestions(user_id: string) {
  if (!user_id) {
    throw new Error("ID do usuário é obrigatório.");
  }
  try {
    const response = await fetch(`${API_URL}/question/answered/${user_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Falha ao carregar dúvidas respondidas",
      );
    }

    return await response;
  } catch (error) {
    throw error;
  }
}

export async function getQuestionByTitle(title: string) {
  if (!title) {
    throw new Error("O título é obrigatório para a busca.");
  }
  try {
    const response = await fetch(
      `${API_URL}/question/title/${encodeURIComponent(title)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Dúvida não encontrada");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteQuestion(id: string) {
  if (!id) {
    throw new Error("ID é obrigatório para deletar a dúvida.");
  }
  try {
    const response = await fetch(`${API_URL}/question/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Question not found");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateQuestionAnswered(data: UpdateQuestionDTO) {
  if (!data || !data.id) {
    throw new Error("ID da dúvida é obrigatório para atualização.");
  }
  try {
    return await fetch(`${API_URL}/question/${data.id}`, {
      method: "PATCH",
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
