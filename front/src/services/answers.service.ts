import { CreateAnswersDTO } from "../dtos/answers/create-answers.dto.ts";

export function createAnswers(data: CreateAnswersDTO) {
    return fetch('http://localhost:4001/api/answers/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export async function allAnswers() {
    const response = await fetch('http://localhost:4001/api/answers/', { method: 'GET' });
    const users = await response.json();
    return users;
}

export async function getAnswers(id:string) {
    const response = await fetch(`http://localhost:4001/api/answers/${id}`, { method: 'GET' });
    const users = await response.json();
    return users;
}

export async function deleteAnswers(id:string) {
    const response = await fetch(`http://localhost:4001/api/answers/${id}`, { method: 'DELETE' });
    const users = await response.json();
    return users;
}