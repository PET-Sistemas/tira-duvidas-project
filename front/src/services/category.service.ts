import { CreateCategoryDTO } from "../dtos/category/create-category.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function createCategory(data: CreateCategoryDTO) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Os dados da categoria não podem estar vazios.");
  }
  try {
    const response = await fetch(`${API_URL}/category/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao criar categoria");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function allCategory() {
  try {
    const response = await fetch(`${API_URL}/category/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao carregar categorias");
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    throw error;
  }
}

export async function getCategory(id: string) {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  try {
    return await fetch(`${API_URL}/category/${id}`, {
      method: "GET",
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

export async function deleteCategory(id: string) {
  if (!id) {
    throw new Error("ID da categoria é obrigatório para exclusão.");
  }
  try {
    const response = await fetch(`${API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Falha ao deletar categoria");
    }

    if (response.status === 204) {
      return true;
    }
    const category = await response.json();
    return category;
  } catch (error) {
    throw error;
  }
}
