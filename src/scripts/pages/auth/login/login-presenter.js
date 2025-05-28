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

      // ganti pas ada API
      // const response = await this.#model.login(email, password);

      // 👇 Simulasi response (mock)
      const response = {
        status: true,
        message: 'Login berhasil (mock)',
        data: {
          accessToken: 'mock-token-abc123',
        },
      };

      const token = response?.data?.accessToken || response?.accessToken || response?.token;

      if (!token) {
        throw new Error('Token tidak tersedia dari server.');
      }

      console.log('[Login] Token:', token);
      this.#authModel.putAccessToken(token);

      this.#view.loginSuccessfully(response.message);
    } catch (error) {
      const msg = error?.message || 'Login gagal. Silakan coba lagi.';
      console.error('[Login Error]', msg);
      this.#view.loginFailed(msg);
    }
  }
}
