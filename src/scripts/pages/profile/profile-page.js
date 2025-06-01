import Database from '../../data/database';
import ProfilePresenter from './profile-presenter';

export default class ProfilePage {
  #presenter = null;

  async render() {
    return `
    <section class="profile-page">
  <h2 class="section-title">Profil Saya</h2>
  <div class="profile-container">
    <form class="profile-card" id="profile-form">
      <h3>Profil</h3>
      <div class="profile-header">
        <div class="avatar" id="avatar-preview">
          <i class="fa fa-user"></i>
        </div>
        <div class="profile-name" id="display-name"></div>
      </div>
      <div class="profile-info">
        <div class="info-item">
          <i class="fa fa-user"></i>
          <label>Nama:</label>
          <input type="text" name="name" id="input-name" />
        </div>
        <div class="info-item">
          <i class="fa fa-at"></i>
          <label>Email:</label>
          <input type="email" name="email" id="input-email" />
        </div>
        <div class="info-item">
          <i class="fa fa-plus-square"></i>
          <label>Kata Sandi Baru:</label>
          <input type="password" name="password" id="input-password" />
        </div>
      </div>
      <button class="btn-save" type="submit">Simpan Perubahan</button>
    </form>

    <form class="photo-card" id="photo-form">
      <h3>Foto</h3>
      <div class="photo-placeholder" id="photo-preview">
        <i class="fa fa-image"></i>
      </div>
      <div class="upload-file">
        <i class="fa fa-file"></i>
        <label for="photo-input">Pilih File:</label>
        <input type="file" id="photo-input" name="photo" accept="image/*" />
      </div>
      <button class="btn-save" type="submit">Simpan Perubahan</button>
    </form>
  </div>
</section>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: Database,
    });

    this.#presenter.loadProfile();

    document.getElementById('profile-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('input-name').value;
      const email = document.getElementById('input-email').value;
      const password = document.getElementById('input-password').value;
      await this.#presenter.saveProfile({ name, email, password });
    });

    document.getElementById('photo-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const file = document.getElementById('photo-input').files[0];
      if (file) await this.#presenter.savePhoto(file);
    });

    document.getElementById('photo-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;

      const preview = document.getElementById('photo-preview');
      const avatar = document.getElementById('avatar-preview');

      preview.innerHTML = ''; // kosongkan area preview besar
      preview.appendChild(img); // tampilkan preview besar

      avatar.innerHTML = ''; // kosongkan avatar
      avatar.appendChild(img.cloneNode()); // tampilkan versi kecil
    };
    reader.readAsDataURL(file);
  }
});
  }

  showProfile(profile) {
    document.getElementById('input-name').value = profile.name || '';
    document.getElementById('input-email').value = profile.email || '';
    document.getElementById('display-name').textContent = profile.name || '';
    if (profile.photo) {
      const img = document.createElement('img');
      img.src = profile.photo;
      document.getElementById('photo-preview').innerHTML = '';
      document.getElementById('avatar-preview').innerHTML = '';
      document.getElementById('photo-preview').appendChild(img.cloneNode());
      document.getElementById('avatar-preview').appendChild(img);
    }
  }
}
