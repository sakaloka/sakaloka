import { renderHeader } from '../../components/header.js';
import { getSession } from '../../components/utils/auth.js';
import { API_URL } from '../../constants/urlApi.js';
import Swal from 'sweetalert2';

export default class ProfilePresenter {
  #view;
  #user;

  constructor({ view }) {
    this.#view = view;
    this.#user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  async loadProfile() {
    this.#view.showProfile(this.#user);
  }

  attachEvents() {
    // Form Profil
    document.getElementById('profile-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('input-name').value.trim();
      const session = getSession();
      const userId = session?.user?.userId;
      const token = session?.accessToken;

      if (!userId || !token) {
        Swal.fire({
          icon: 'error',
          title: 'Belum Login',
          text: 'Anda belum login.',
        });
        return;
      }

      const updatedUser = { ...this.#user, name };

      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.#user = updatedUser;

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Profil berhasil diperbarui.',
          timer: 1500,
          showConfirmButton: false,
        });

        renderHeader();
        this.loadProfile();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal memperbarui profil.',
        });
      }
    });

    // Form Foto
    document.getElementById('photo-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const file = document.getElementById('photo-input')?.files?.[0];
      if (!file) return;

      const session = getSession();
      const userId = session?.user?.userId;
      const token = session?.accessToken;

      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch(`${API_URL}/users/${userId}/photo`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        const updatedUser = {
          ...this.#user,
          previewPhotoUrl: result.photoUrl,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.#user = updatedUser;

        Swal.fire({
          icon: 'success',
          title: 'Foto Berhasil Diperbarui!',
          showConfirmButton: false,
          timer: 1500,
        });

        renderHeader();
        this.loadProfile();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Gagal',
          text: 'Gagal mengunggah foto.',
        });
      }
    });
  }
}
