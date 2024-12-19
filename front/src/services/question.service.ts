

export async function allQuestions() {
    const response = await fetch('http://localhost:4001/api/question', { method: 'GET' });
    const questions = await response.json();
    return questions;
}