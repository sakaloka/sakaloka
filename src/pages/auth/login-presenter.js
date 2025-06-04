import { saveSession } from '../../components/utils/auth';
import { API_URL } from '../../constants/urlApi';

export default class LoginPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async handleLogin(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw new Error('Email atau password salah');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login gagal');
      }

      const result = await response.json();

      if (result.error === 'fail') {
        this.#view.showError(result.message || 'Terjadi kesalahan saat login');
        location.hash = '#/login';
      } else {
        saveSession(result.loginResult);
        this.#view.showSuccess('Login berhasil');
        location.hash = '#/home';
      }
    } catch (err) {
      this.#view.showError(err.message || 'Terjadi kesalahan saat login');
      location.hash = '#/login';
    }
  }
}
