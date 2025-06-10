import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { LoginDTO } from "../dtos/user/login.dto";

export function register(data: CreateUserDTO) {
  return fetch("http://localhost:8080/api/user/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function login(data: LoginDTO) {
  return fetch("http://localhost:8080/api/v1/auth/email/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function getUserById(id: string){
  const response = await fetch(`http://localhost:8080/api/user/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("User not found");
  }
  const user = await response.json();
  return user;
}

export async function allUser() {
  const response = await fetch("http://localhost:8080/api/user/", {
    method: "GET",
  });
  const users = await response.json();
  return users;
}
