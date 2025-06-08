import { saveSession, getSession } from '../../components/utils/auth';
import { API_URL } from '../../constants/urlApi';
import Swal from 'sweetalert2';

export default class PersonalOptionPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  handleChange(checked, allCheckboxes) {
    if (checked.length > 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Terlalu Banyak!',
        text: 'Kamu hanya bisa memilih maksimal 5 destinasi favorit.',
        confirmButtonColor: '#483434',
      });
      checked[checked.length - 1].checked = false;
    }
  }

  async handleSubmit(selected, count) {
    if (!selected) {
      Swal.fire({
        icon: 'warning',
        title: 'Tidak Cukup!',
        text: `Pilih tepat 5 destinasi favorit. Sekarang baru ${count || 0}.`,
      });
      return;
    }

    const session = getSession();
    const userId = session?.user?.userId;
    const token = session?.accessToken;

    if (!userId || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Sesi Habis!',
        text: 'Sesi tidak ditemukan. Silakan login kembali.',
      });
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

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Preferensi berhasil disimpan.',
        confirmButtonColor: '#483434',
      }).then(() => {
        location.hash = '#/home';
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.message,
      });
    }
  }
}
