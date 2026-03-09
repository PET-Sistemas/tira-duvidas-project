import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { LoginDTO } from "../dtos/user/login.dto";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";

const API_URL = import.meta.env.VITE_API_URL;

export function register(data: CreateUserDTO) {
  return fetch(`${API_URL}/v1/auth/email/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function login(data: LoginDTO) {
  return fetch(`${API_URL}/v1/auth/email/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function getUserById(id: string){
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("User not found");
  }
  const user = await response.json();
  return user;
}

export async function allUser() {
  const response = await fetch(`${API_URL}/user/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Falha ao carregar usuários");
  }
  const users = await response.json();
  return users;
}

/**
 * Busca um usuário pelo CPF.
 * O CPF pode ser informado com ou sem formatação (123.456.789-09 ou 12345678909).
 * 
 * @param cpf - CPF do usuário
 * @returns Dados do usuário ou null se não encontrado
 */
export async function getUserByCpf(cpf: string) {
  const response = await fetch(`${API_URL}/user/cpf/${encodeURIComponent(cpf)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Falha ao buscar usuário por CPF");
  }

  return await response.json();
}

export async function updateUser(data: Partial<UpdateUserDTO>) {
  const response = await fetch(`${API_URL}/user/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json(); // Captura detalhes do erro
    throw new Error(errorData.message || "Failed to update user");
  }
  return await response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/v1/auth/forgot/password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error('Erro ao processar solicitação');
  }
  return await response.json();
}