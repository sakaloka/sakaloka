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
      console.log('[Register] Simulasi kirim data ke API:');
      console.log({ name, email, password });

      // Nanti pas ada API, ganti blok ini
      // const response = await this.#model.register({ name, email, password });
      const response = {
        status: true,
        message: 'Simulasi register berhasil',
        data: {
          accessToken: 'dummy-token-abc123',
        },
      };

      console.log('[Register] Simulasi respon dari server:', response);

      const token = response?.data?.accessToken || response?.accessToken || response?.token;

      if (!token) {
        throw new Error('Token tidak tersedia (simulasi).');
      }

      // Simulasi simpan token
      console.log('[Register] Token yang disimpan:', token);
      this.#authModel.putAccessToken(token); 

      // Tampilkan sukses
      this.#view.registerSuccessfully('Registrasi berhasil! (simulasi)');
    } catch (error) {
      const msg = error?.message || 'Registrasi gagal. (simulasi)';
      console.error('[Register Error]', msg);
      this.#view.registerFailed(msg);
    }
  }
}
