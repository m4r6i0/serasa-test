import api from "./api";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const register = async (userData: any): Promise<any> => {
  const response = await api.post("/users/register", userData);
  return response.data;
};
