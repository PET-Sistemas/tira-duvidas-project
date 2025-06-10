import { CreateCategoryDTO } from "../dtos/category/create-category.dto.js";

export function createCategory(data: CreateCategoryDTO) {
  return fetch("http://localhost:8080/api/category/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function allCategory() {
  const response = await fetch("http://localhost:8080/api/category/", {
    method: "GET",
  });
  const categories = await response.json();
  return categories;
}

export async function getCategory(id: string) {
  const response = await fetch(`http://localhost:8080/api/category/${id}`, {
    method: "GET",
  });
  const category = await response.json();
  return category;
}

export async function deleteCategory(id: string) {
  const response = await fetch(`http://localhost:8080/api/category/${id}`, {
    method: "DELETE",
  });
  const category = await response.json();
  return category;
}
