import api from "@/config/axios";

// Auth API Functions
export const login = (email: string, password: string) => {
  return api.post("/v1/auth/login", {
    email: email,
    password: password,
  });
};

export const logout = () => {
  return api.post("/v1/auth/logout");
};

export const refreshToken = (refreshToken: string) => {
  return api.post("/v1/auth/refresh-token", { refresh_token: refreshToken });
};

export const getProfile = () => {
  return api.get("/v1/auth/profile");
};

export const validateToken = () => {
  return api.get("/v1/auth/validate-token");
};

export const updateProfile = (data: any) => {
  return api.put("/v1/instructor/profile", data);
};

export const register = (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  return api.post("/v1/auth/register", data);
};
