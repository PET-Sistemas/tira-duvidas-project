import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { LoginDTO } from "../dtos/user/login.dto";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";

const API_URL = import.meta.env.VITE_API_URL;

export async function register(data: CreateUserDTO) {
  try {
    const response = await fetch(`${API_URL}/v1/auth/email/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao registrar usuário");
    }
    return await response;
  } catch (error) {
    throw error;
  }
}

export async function login(data: LoginDTO) {
  try {
    const response = await fetch(`${API_URL}/v1/auth/email/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Usuário ou senha incorretos");
    }
    return await response;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string) {
  if (!id) throw new Error("ID do usuário é obrigatório.");
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Usuário não encontrado");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function allUser() {
  try {
    const response = await fetch(`${API_URL}/user/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao carregar usuários");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    throw error;
  }
}

/**
 * Busca um usuário pelo CPF.
 * O CPF pode ser informado com ou sem formatação (123.456.789-09 ou 12345678909).
 *
 * @param cpf - CPF do usuário
 * @returns Dados do usuário ou null se não encontrado
 */
export async function getUserByCpf(cpf: string) {
  if (!cpf) throw new Error("CPF é obrigatório.");
  try {
    const response = await fetch(
      `${API_URL}/user/cpf/${encodeURIComponent(cpf)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao buscar usuário por CPF");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data: Partial<UpdateUserDTO>) {
  if (!data.id)
    throw new Error("ID do usuário é obrigatório para atualização.");
  try {
    const response = await fetch(`${API_URL}/user/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json(); // Captura detalhes do erro
      throw new Error(errorData.message || "Failed to update user");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(email: string) {
  if (!email) throw new Error("E-mail é obrigatório.");
  try {
    const response = await fetch(`${API_URL}/v1/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao processar solicitação");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(token: string, password: string) {
  if (!token || !password)
    throw new Error("Token e nova senha são obrigatórios.");
  try {
    const response = await fetch(`${API_URL}/v1/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao processar solicitação");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
