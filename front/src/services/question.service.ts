import { CreateQuestionDTO } from "../dtos/question/create-question.dto";

export function createQuestion(data: CreateQuestionDTO) {
    return fetch('http://localhost:4001/api/question/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export async function allQuestion() {
    const response = await fetch('http://localhost:4001/api/question/', { method: 'GET' });
    const questions = await response.json();
    return questions;
}

export async function getQuestion(id:string) {
    const response = await fetch(`http://localhost:4001/api/question/${id}`, { method: 'GET' });
    const question = await response.json();
    return question;
}

export async function getQuestionByTitle(title:string) {
    const response = await fetch(`http://localhost:4001/api/question/title/${title}`, { method: 'GET' });
    const question = await response.json();
    return question;
}

export async function deleteQuestion(id:string) {
    const response = await fetch(`http://localhost:4001/api/question/${id}`, { method: 'DELETE' });
    const question = await response.json();
    return question;
}