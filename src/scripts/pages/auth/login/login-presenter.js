export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async login({ email, password }) {
    try {
      console.log('[Login] Kirim data:', { email, password });

      const response = await this.#model.login({ email, password });
      const token = response?.loginResult?.token;
      const user = response?.loginResult;

      if (!token) {
        throw new Error('Token tidak tersedia dari server.');
      }

      this.#authModel.putAccessToken(token, user);

      this.#view.loginSuccessfully(response.message);
    } catch (error) {
      const msg = error?.message || 'Login gagal. Silakan coba lagi.';
      console.error('[Login Error]', msg);
      this.#view.loginFailed(msg);
    }
  }
}
