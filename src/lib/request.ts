// src/lib/request.ts
import { post } from './api';
import { Login, Register } from './models';

/**
 * User authentication API functions
 */

// Login function
export const login = async (email: string, password: string): Promise<Login> => {
  return await post<Login>('/auth/login', { email, password });
};

// Register function
export const register = async (email: string, password: string): Promise<Register> => {
  return await post<Register>('/auth/register', { email, password });
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// Get current user token
export const getCurrentUserToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set user token after successful login/registration
export const setCurrentUserToken = (token: string): void => {
  localStorage.setItem('token', token);
};
