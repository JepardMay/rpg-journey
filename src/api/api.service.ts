import { API_BASE_URL, ENDPOINTS } from '../api/api.config';

import { SignType } from '../models';

class APIService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async login(credentials: SignType) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    // Handle the response
    return await response.json();
  }

  async signup(userData: SignType) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.signup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    // Handle the response
    return await response.json();
  }
  
  async signOut() {
    try {
      await fetch(`${API_BASE_URL}${ENDPOINTS.signout}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }
}

export default new APIService();
