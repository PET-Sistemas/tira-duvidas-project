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
  const response = await fetch(`${API_URL}/question/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const questions = response;
  return questions;
}

export async function getQuestion(id: UpdateQuestionDTO) {
  const response = await fetch(`${API_URL}/question/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const question = response.json();
  return question;
}

export async function getQuestionByUserId(user_id: string) {
  const response = await fetch(`${API_URL}/question/user/${user_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const question = response;
  return question;
}

export async function getAnsweredQuestions(user_id: string) {
  const response = await fetch(`${API_URL}/question/answered/${user_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if(!response.ok) {
    throw new Error("Question not found");
  }
  const question = response;
  return question;
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
  const question = response.json();
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
  const question = response.json();
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
