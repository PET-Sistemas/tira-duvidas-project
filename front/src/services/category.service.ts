import { CreateCategoryDTO } from "../dtos/category/create-category.dto.js";

const API_URL = import.meta.env.VITE_API_URL;

export function createCategory(data: CreateCategoryDTO) {
  return fetch(`${API_URL}/category/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

export async function allCategory() {
  const response = await fetch(`${API_URL}/category/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const categories = await response.json();
  return categories;
}

export async function getCategory(id: string) {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const category = await response.json();
  return category;
}

export async function deleteCategory(id: string) {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const category = await response.json();
  return category;
}
