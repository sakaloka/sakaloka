import { saveSession } from '../../components/utils/auth';
import { login, register } from '../../constants/urlApi';

export default class RegisterPresenter {
  #view;
  #userModel;
  #authModel;

  constructor({ view, authModel, userModel }) {
    this.#view = view;
    this.#authModel = authModel;
    this.#userModel = userModel;
  }

  async handleRegister({ name, email, password, confirmPassword, agreement }) {
    if (!agreement) {
      this.#view.showError('Kamu harus menyetujui Syarat dan Ketentuan.');
      return;
    }

    if (password !== confirmPassword) {
      this.#view.showError('Konfirmasi password tidak cocok.');
      return;
    }

    try {
      const res = await register({ name, email, password });

      if (!res.ok) {
        const msg = res?.message || 'Registrasi gagal.';
        this.#view.showError(msg);
        return;
      }

      const loginResponse = await login({ email, password });
      if (loginResponse.ok) {
        saveSession(loginResponse.loginResult);
        this.#view.showSuccess('Registrasi berhasil!');
        setTimeout(() => {
          window.location.hash = '#/personal-option';
        }, 1500);
      } else {
        this.#view.showError('Terjadi kesalahan saat melakukan registrasi.');
      }
    } catch (err) {
      console.error(err);
      this.#view.showError('Terjadi kesalahan koneksi.');
    }
  }
}
