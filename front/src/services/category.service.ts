import { CreateCategoryDTO } from "../dtos/category/create-category.dto.ts";

export function createCategory(data: CreateCategoryDTO) {
    return fetch('http://localhost:4001/api/category/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export async function allCategory() {
    const response = await fetch('http://localhost:4001/api/category/', { method: 'GET' });
    const users = await response.json();
    return users;
}

export async function getCategory(id:string) {
    const response = await fetch(`http://localhost:4001/api/category/${id}`, { method: 'GET' });
    const users = await response.json();
    return users;
}

export async function deleteCategory(id:string) {
    const response = await fetch(`http://localhost:4001/api/category/${id}`, { method: 'DELETE' });
    const users = await response.json();
    return users;
}