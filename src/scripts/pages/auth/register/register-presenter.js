export default class RegisterPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async register({ name, email, password }) {
    try {
      const response = await this.#model.register({ name, email, password });
      
      if (response.ok) {
        const response = await this.#model.login({ email, password });
        const token = response?.loginResult?.token;
        const user = response?.loginResult;
  
        if (!token) {
          throw new Error('Token tidak tersedia dari server.');
        }
  
        this.#authModel.putAccessToken(token, user);
  
        // Tampilkan sukses
        this.#view.registerSuccessfully('Registrasi berhasil! (simulasi)');
      }
    } catch (error) {
      const msg = error?.message || 'Registrasi gagal. (simulasi)';
      console.error('[Register Error]', msg);
      this.#view.registerFailed(msg);
    }
  }
}
