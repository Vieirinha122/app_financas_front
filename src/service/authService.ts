const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type LoginDTO = {
  email: string;
  senha: string;
};

export type RegisterDTO = {
  nome: string;
  email: string;
  senha: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
};

export async function loginUser(data: LoginDTO): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'E-mail ou senha incorretos.');
  }

  return response.json();
}

export async function registerUser(data: RegisterDTO): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro ao criar conta.');
  }

  return response.json();
}