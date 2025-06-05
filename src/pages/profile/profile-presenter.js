import { renderHeader } from '../../components/header.js';

export default class ProfilePresenter {
  #view;
  #userModel;
  #user;

  constructor({ view, userModel }) {
    this.#view = view;
    this.#userModel = userModel;
    this.#user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  async loadProfile() {
    const profile =JSON.parse(localStorage.getItem('user') || '{}');
    if (profile) {
      this.#user = profile;
      this.#view.showProfile({
        ...this.#user,
        previewPhotoUrl: this.#user.photoUrl
      });
      this.#attachEvents();
    }
  }

 #attachEvents() {
  document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-name').value.trim();
    const email = document.getElementById('input-email').value.trim();
    const password = document.getElementById('input-password').value.trim();

    const updatedUser = {
      ...this.#user,
      name,
      email,
      ...(password && { password }),
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.#user = updatedUser;
    this.#view.showSuccess('Profil berhasil diperbarui!');

    renderHeader(); // Render ulang header agar nama/avatar ikut berubah
    this.loadProfile();
  });

  const photoInput = document.getElementById('photo-input');
  const photoPreview = document.getElementById('photo-preview');

  photoInput?.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.innerHTML = `<img src="${reader.result}" alt="Preview" />`;
      this.#user.photoUrl = reader.result;
      this.#user.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('photo-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!this.#user.photoUrl)
      return this.#view.showError('Pilih gambar terlebih dahulu');

    localStorage.setItem('user', JSON.stringify(this.#user));
    this.#view.showSuccess('Foto berhasil diperbarui!');

    renderHeader(); 
    this.loadProfile();
  });
}
}
