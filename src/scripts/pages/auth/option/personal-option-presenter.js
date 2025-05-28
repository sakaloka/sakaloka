export default class PersonalOptionPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async savePreferences(destinations) {
    try {
      console.log('[PersonalOption] Simulasi kirim preferensi ke API:', destinations);

      // Nanti pas ada API, ganti blok ini
      // const response = await this.#model.savePreferences(destinations);
      const response = {
        status: true,
        message: 'Preferensi berhasil disimpan',
      };

      if (!response.status) {
        throw new Error(response.message || 'Gagal menyimpan preferensi');
      }

      this.#view.optionSavedSuccessfully(response.message);
    } catch (error) {
      const msg = error?.message || 'Terjadi kesalahan saat menyimpan preferensi';
      console.error('[PersonalOption Error]', msg);
      this.#view.optionSaveFailed(msg);
    }
  }
}
