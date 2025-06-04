import { getSession } from "../../components/utils/auth";
import { API_URL } from "../../constants/urlApi";

export default class DestinasiPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async loadDestinations() {
    try {
      const { accessToken } = getSession();

      const response = await fetch(`${API_URL}/destinations`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const json = await response.json();

      if (json.status !== 'success') {
        throw new Error(json.message || 'Gagal mengambil data destinasi');
      }

      this.#view.renderList(json.data);
    } catch (err) {
      this.#view.renderError(err.message || 'Terjadi kesalahan saat mengambil data destinasi');
    }
  }
}
