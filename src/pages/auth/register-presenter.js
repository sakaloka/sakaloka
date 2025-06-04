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

    // Dummy Regis
    if (email === 'dummy@sakaloka.com') {
      const dummyData = {
        accessToken: 'dummy-token',
        user: { name, email },
      };
      this.#userModel.saveSession(dummyData);
      this.#view.showSuccess('Pendaftaran berhasil (dummy)');
      location.hash = '#/personal-option';
      return;
    }

    // API
    try {
      const result = await this.#authModel.register(name, email, password);
      this.#userModel.saveSession(result);
      this.#view.showSuccess('Pendaftaran berhasil');
      location.hash = '#/personal-option';
    } catch (err) {
      this.#view.showError(err.message);
    }
  }
}
