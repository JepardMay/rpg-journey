import { API_BASE_URL, ENDPOINTS } from './api.config';

import { SignType } from './model';

class APIService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token); // Store the token in localStorage
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    }
    return this.token;
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
}

export default new APIService();
