import { saveSession, getSession } from '../../components/utils/auth';
import { API_URL } from '../../constants/urlApi';

export default class PersonalOptionPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  handleChange(checked, allCheckboxes) {
    if (checked.length > 5) {
      this.#view.showError('Kamu hanya bisa memilih maksimal 5 destinasi favorit.');
      checked[checked.length - 1].checked = false;
    }
  }

  async handleSubmit(selected, count) {
    if (!selected) {
      this.#view.showError(`Pilih tepat 5 destinasi favorit. Sekarang baru ${count || 0}.`);
      return;
    }

    const session = getSession();
    const userId = session?.user?.userId;
    const token = session?.accessToken;

    if (!userId || !token) {
      this.#view.showError('Sesi tidak ditemukan. Silakan login kembali.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, preferences: selected }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan preferensi.');

      this.#view.showSuccess('Preferensi berhasil disimpan.');
      location.hash = '#/home';
    } catch (err) {
      this.#view.showError(err.message);
    }
  }
}
