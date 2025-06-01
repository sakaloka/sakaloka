import * as SakaLokaAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <div class="register-wrapper">
        <div class="register-card">
          <h2>Register</h2>
          <form id="register-form">
            <div class="form-group">
              <i class="fas fa-user-plus"></i>
              <input type="text" name="name" placeholder="Nama" required />
            </div>
            <div class="form-group">
              <i class="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div class="form-group">
              <i class="fas fa-plus-square"></i>
              <input type="password" name="password" placeholder="Kata Sandi" required />
            </div>
            <div class="form-group">
              <i class="fas fa-plus-square"></i>
              <input type="password" name="confirmPassword" placeholder="Konfirmasi Kata Sandi" required />
            </div>
            <div class="form-checkbox">
              <input type="checkbox" name="agreement" id="agreement" required />
              <label for="agreement">Saya setuju dengan Syarat dan Ketentuan SakaLoka.</label>
            </div>
            <button type="submit" class="form-button">Buat Akun</button>
            <div class="form-link">
              Sudah punya akun? <a href="#/login">Masuk</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: SakaLokaAPI,
      authModel: AuthModel,
    });

    const form = document.querySelector('#register-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
      const confirmPassword = form.confirmPassword.value.trim();
      const agreement = form.agreement.checked;

      this.#presenter.register({ name, email, password, confirmPassword, agreement });
    });
  }

  registerSuccessfully(message) {
    alert(message);
    location.hash = '/personal-option';
  }

  registerFailed(message) {
    alert(message);
  }
}
