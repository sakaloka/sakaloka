export default class PersonalOptionPresenter {
  #view;
  #authModel;

  constructor({ view, authModel }) {
    this.#view = view;
    this.#authModel = authModel;
  }

  handleChange(checkedValues, checkboxes) {
    checkboxes.forEach((cb) => {
      cb.disabled = checkedValues.length >= 3 && !cb.checked;
    });
  }

  async handleSubmit(selected) {
    if (selected.length !== 3) {
      this.#view.showError('Silakan pilih tepat 3 destinasi favorit.');
      return;
    }

    // API
    try {
      await this.#authModel.saveFavoritDestinasi(selected);

      this.#view.showSuccess(`Destinasi favorit kamu: ${selected.join(', ')}`);
      location.hash = '#/login';
    } catch (error) {
      this.#view.showError(error.message || 'Gagal menyimpan data.');
    }
  }
}
