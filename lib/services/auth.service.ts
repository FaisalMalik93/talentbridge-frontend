/**
 * Authentication Service
 * Handles login, register, and token management
 */

import apiClient from '../api-client';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest) {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data, false);

    if (response.data) {
      this.setToken(response.data.access_token);
      this.setUser(response.data.user);
    }

    return response;
  }

  /**
   * Login user
   */
  async login(data: LoginRequest) {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data, false);

    if (response.data) {
      this.setToken(response.data.access_token);
      this.setUser(response.data.user);
    }

    return response;
  }

  /**
   * Logout user
   */
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Set token in localStorage
   */
  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  /**
   * Set user in localStorage
   */
  private setUser(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  /**
   * Get current user from localStorage
   */
  getUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: 'user' | 'employer' | 'admin'): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();
export default authService;
