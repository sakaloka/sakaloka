import { html, render } from 'lit-html';
import ProfilePresenter from './profile-presenter.js';
import SakaLokaAPI from '../../constants/urlApi.js';

export function renderProfile(container) {
  const presenter = new ProfilePresenter({
    view: {
      showSuccess: (msg) => alert(msg),
      showError: (msg) => alert(msg),
      showProfile: (user) => {
        const template = html`
          <section class="profile-page">
            <h2 class="section-title">Profil Saya</h2>
            <div class="profile-container">
              <form class="profile-card" id="profile-form">
                <h3>Profil</h3>
                <div class="profile-header">
                  <div class="avatar" id="avatar-preview">
                    ${user.previewPhotoUrl
                      ? html`<img src="${user.previewPhotoUrl}" alt="Avatar" />`
                      : html`<i class="fa fa-user"></i>`}
                  </div>
                  <div class="profile-name" id="display-name">${user.name || '-'}</div>
                </div>
                <div class="profile-info">
                  <div class="info-item">
                    <i class="fa fa-user"></i>
                    <label>Nama:</label>
                    <input type="text" id="input-name" value="${user.name || ''}" />
                  </div>
                  <div class="info-item">
                    <i class="fa fa-at"></i>
                    <label>Email:</label>
                    <input type="email" id="input-email" value="${user.email || ''}" />
                  </div>
                  <div class="info-item">
                    <i class="fa fa-plus-square"></i>
                    <label>Kata Sandi Baru:</label>
                    <input type="password" id="input-password" />
                  </div>
                </div>
                <button class="btn-save" type="submit">Simpan Perubahan</button>
              </form>

              <form class="photo-card" id="photo-form">
                <h3>Foto</h3>
                <div class="photo-placeholder" id="photo-preview">
                  ${user.previewPhotoUrl
                    ? html`<img src="${user.previewPhotoUrl}" alt="Foto Profil" />`
                    : html`<i class="fa fa-image"></i>`}
                </div>
                <div class="upload-file">
                  <i class="fa fa-file"></i>
                  <label for="photo-input">Pilih File:</label>
                  <input type="file" id="photo-input" accept="image/*" />
                </div>
                <button class="btn-save" type="submit">Simpan Perubahan</button>
              </form>
            </div>
          </section>
        `;

        render(template, container);
      },
    },
    userModel: SakaLokaAPI,
  });

  presenter.loadProfile();
}
