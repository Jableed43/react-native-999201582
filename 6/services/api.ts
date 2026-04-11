import { API_URL } from "../constants/api";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error en el servidor");
  return await response.json();
};

export const createUser = async (userData: CreateUserData): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("No se pudo crear el usuario");
  return await response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error("No se pudo eliminar el usuario");
};

export const updateUser = async (id: number, userData: Partial<CreateUserData>): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("No se pudo actualizar el usuario");
  return await response.json();
};
